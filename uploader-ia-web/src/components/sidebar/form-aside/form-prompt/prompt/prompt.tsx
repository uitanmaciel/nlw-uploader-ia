import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

interface Prompt {
    id: string
    title: string
    template: string
}

interface PromptSelectProps {
    onPromptSelected: (template: string) => void
}

export function Prompt(props: PromptSelectProps) {
    const [prompts, setPrompts] = useState<Prompt[] | null>(null)

    useEffect(() => {
        api.get('/prompts')
            .then(response => setPrompts(response.data)
            )
    }, [])

    function handlePromptSelected(promptId: string){
        const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

        if(!selectedPrompt) 
            return

        return props.onPromptSelected(selectedPrompt.template)
    }

    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="transcription_prompt">Transcription Prompt</Label>
                <Select onValueChange={handlePromptSelected}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a prompt..." />
                    </SelectTrigger>
                    <SelectContent>
                        {prompts?.map(prompt => {
                            return (
                                <SelectItem
                                    key={prompt.id}
                                    value={prompt.id}
                                >
                                    {prompt.title}
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </div>
        </>
    )
}