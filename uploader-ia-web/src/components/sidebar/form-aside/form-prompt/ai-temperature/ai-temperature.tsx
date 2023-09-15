import { useState } from "react";
import { Label } from "../../../../ui/label";
import { Slider } from "../../../../ui/slider";

interface AITemperatureProps {
    onAITemperature: (temperature: number) => void
}

export function AITemperature(props: AITemperatureProps) {
    const [temperature, setTemperature] = useState(0.5);
    props.onAITemperature(temperature)    

    return (
        <div className="space-y-4">
            <Label>AI Temperature</Label>
            <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={value => setTemperature(value[0])}                
            />
            <span
                className="block text-xs text-muted-foreground italic leading-relaxed"
            >
                Higher values tend to make the result more creative and with possible errors. Recommended value: 0.5
            </span>
        </div>
    )
}