import { Separator } from "@/components/ui/separator";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { FileVideo, Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { api } from "@/lib/axios";

type Status = "waiting" | "converting" | "uploading" | "generating" | "success" | "error"
const statusMessages = {
    converting: "Converting to audio...",
    uploading: "Uploading to server...",
    generating: "Generating transcription...",
    success: "Success!",
    error: "Error generating the transcription."
}

interface FormUploadProps {
    onVideoUploaded: (videoId: string) => void
}

export function FormaUpload(props: FormUploadProps) {
    const promptInputRef = useRef<HTMLTextAreaElement>(null)
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [status, setStatus] = useState<Status>("waiting")
    

    function handleUpload(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.currentTarget

        if (!files)
            return

        const selectedFile = files[0]
        setVideoFile(selectedFile)
    }

    const previewURL = useMemo(() => {
        if (!videoFile)
            return null

        return URL.createObjectURL(videoFile)
    }, [videoFile])

    async function extractVideoToAudio(video: File) {
        const ffmpeg = await getFFmpeg()
        await ffmpeg.writeFile('file.mp4', await fetchFile(video))

        await ffmpeg.exec([
            '-i',
            'file.mp4',
            '-map',
            '0:a',
            '-b:a',
            '20k',
            '-acodec',
            'libmp3lame',
            'output.mp3'
        ])

        const data = await ffmpeg.readFile('output.mp3')

        const audioFileBlob = new Blob([data], { type: 'audio/mp3' })
        const audioFile = new File([audioFileBlob], 'audio.mp3', {
            type: 'audio/mpeg'
        })
        return audioFile
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const prompt = promptInputRef.current?.value

        if (!videoFile)
            return

        setStatus("converting")
        //Extract audio of video
        const audioFile = await extractVideoToAudio(videoFile)
        const data = new FormData()
        data.append("file", audioFile)
        setStatus("uploading")
        const response = await api.post("/videos", data)
        const videoId = response.data.video.id
        setStatus("generating")
        await api.post(`/videos/${videoId}/transcription`, { prompt })
        setStatus("success")
        props.onVideoUploaded(videoId)
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <label
                htmlFor="video"
                className="relative border border-dashed flex rounded-md aspect-video cursor-pointer text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5">
                {previewURL ? (
                    <video
                        src={previewURL}
                        className="w-full h-full object-cover pointer-events-none absolute inset-0"
                        controls={false}
                    />
                ) : (
                    <>
                        <FileVideo className="w-6 h-6" />
                        Upload video
                    </>
                )}
            </label>
            <input
                type="file"
                id="video"
                accept="video/mp4"
                className="sr-only"
                onChange={handleUpload}
            />
            <Separator />
            <Textarea
                ref={promptInputRef}
                id="transcription_prompt"
                className="h-15 leading-relaxed resize-none"
                placeholder="Enter keywords spoken in the video, separated by ( , )."
                disabled={status !== "waiting"}
            />
            <Button
                type="submit"                
                disabled={status !== "waiting"}
                data-success={status === "success"}
                className="w-full data-[success=true]:bg-emerald-300"
            >
                {status === "waiting" ? (
                    <>
                        Submit video
                        <Upload className="w-4 h-4 ml-2" />
                    </>
                ) : statusMessages[status]}
            </Button>
        </form>
    )
}