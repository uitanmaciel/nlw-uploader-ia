import { Github } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export function Header() {
    function handleGithubLink() {
        window.open("https://github.com/uitanmaciel")
    }

    return (
        <div className="px-6 py-3 flex items-center justify-between border-b">
            <h1 className="font-bold text-xl">uploader.ia</h1>
            <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Developed with ❤️ in Rocketseat NLW</span>
                <Separator orientation="vertical" className="h-6" />
                <Button variant="outline" type="button" onClick={handleGithubLink}>
                    <Github className="w-4 h-4 mr-2" /> Github
                </Button>
            </div>
        </div>
    )
}