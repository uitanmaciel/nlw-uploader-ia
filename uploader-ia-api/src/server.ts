import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { getAllPrompts } from "./routes/get-all-prompts";
import { uploadVideo } from "./routes/upload-video";
import { createTranscription } from "./routes/create-transcription";
import { generateAISuggestions } from "./routes/generate-ai-suggestions";


const app = fastify();

app.register(fastifyCors, {
    origin: "*",
})

app.register(getAllPrompts)
app.register(uploadVideo)
app.register(createTranscription)
app.register(generateAISuggestions)

app.listen({
    port: 3333,
}).then(() => {
    console.log("Server is running on port 3333");
})