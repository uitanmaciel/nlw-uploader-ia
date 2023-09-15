
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GptProps {
    onGPT: (gpt: string) => void
}

export function Gpt(props: GptProps) {
    props.onGPT("gpt3.5")
    
    return (
        <div className="space-y-2">
            <Label>Model</Label>
            <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
            </Select>
            <span className="block text-xs text-muted-foreground italic">
                You will be able to customize this option soon.
            </span>
        </div>
    )
}