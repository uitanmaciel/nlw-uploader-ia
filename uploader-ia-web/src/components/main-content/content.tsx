import { useState } from "react";
import { FormPrompt } from "../sidebar/form-aside/form-prompt/form-prompt";
import { FormaUpload } from "../sidebar/form-aside/form-upload/form-upload";
import { Textarea } from "../ui/textarea";
import { useCompletion } from "ai/react";

export function Content() {
    const [videoId, setVideoId] = useState<string | null>(null)    
    const [gpt, setGPT] = useState<string | null>(null)
    const [aiTemperature, setAITemperature] = useState<number | null>(null)

    const {
        input,
        setInput,
        handleInputChange,
        handleSubmit,
        completion,
    } = useCompletion({
        api: "http://localhost:3333/ai/generate-suggestions",
        body: {
            videoId,
            aiTemperature,
        },
        headers: {
            "Content-Type": "application/json",
        }
    })

    return (
        <>
            <main className="flex-1 p-6 flex gap-6">
                <div className="flex flex-col flex-1 gap-4">
                    <div className="grid grid-rows-2 gap-4 flex-1">
                        <Textarea
                            className="resize-none p-4 leading-relaxed"
                            placeholder="Include the prompt for the AI..."
                            value={input}
                            onChange={handleInputChange}                          
                        />
                        <Textarea
                            className="resize-none p-4 leading-relaxed"
                            placeholder="Result generated by AI..." readOnly
                            value={completion}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">Remember: you can use the <code className="text-purple-300">{'{transcription}'}</code> variable in your prompt to add the transcript content of the selected video.</p>
                </div>
                <aside className="w-80 space-y-7">
                    <FormaUpload onVideoUploaded={setVideoId} />
                    <FormPrompt
                        onSubmit={handleSubmit}
                        onPromptTemplate={setInput}
                        onGPT={setGPT}
                        onAITemperature={setAITemperature}
                    />
                </aside>
            </main>
        </>
    )
}