import { Separator } from "@/components/ui/separator";
import { Prompt } from "./prompt/prompt";
import { Gpt } from "./gpt-select/gpt";
import { AITemperature } from "./ai-temperature/ai-temperature";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

interface FormPromptProps {
    onPromptTemplate: (template: string) => void
    onAITemperature: (temperature: number) => void
    onGPT: (gpt: string) => void
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export function FormPrompt(props: FormPromptProps) {
    function handleGPT(gpt: string) {
        props.onGPT(gpt)
    }
    
    function handlePromptSelected(template: string) {
        props.onPromptTemplate(template)
    }

    function handleAITemperature(temperature: number) {
        props.onAITemperature(temperature)
    }

    return (
        <form className="space-y-4" onSubmit={props.onSubmit}>
            <Separator />
            <Prompt onPromptSelected={handlePromptSelected} />
            <Gpt onGPT={handleGPT}/>
            <Separator />
            <AITemperature onAITemperature={handleAITemperature}/>
            <Separator />
            <Button type="submit" className="w-full">
                Execute
                <Wand2 className="w-4 h-4 ml-2" />
            </Button>
        </form>
    )
}