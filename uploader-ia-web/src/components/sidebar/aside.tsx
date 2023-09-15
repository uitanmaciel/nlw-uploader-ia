import { useState } from "react";
import { FormPrompt } from "./form-aside/form-prompt/form-prompt";
import { FormaUpload } from "./form-aside/form-upload/form-upload";




export function Aside() {
    const [videoId, setVideoId] = useState<string | null>(null)
    const [promptTemplate, setPromptTemplate] = useState<string | null>(null)
    const [gpt, setGPT] = useState<string | null>(null)
    const [aiTemperature, setAITemperature] = useState<number | null>(null)
    
    return (
        <aside className="w-80 space-y-7">
            <FormaUpload onVideoUploaded={setVideoId}/>
            <FormPrompt 
                onPromptTemplate={setPromptTemplate}
                onGPT={setGPT}
                onAITemperature={setAITemperature}
            />
        </aside>
    )
}