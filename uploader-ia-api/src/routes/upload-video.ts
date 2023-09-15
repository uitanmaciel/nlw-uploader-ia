import { FastifyInstance } from "fastify";
import { fastifyMultipart } from "@fastify/multipart";
import path from "node:path";
import fs from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { prisma } from "../lib/prisma";

const pump = promisify(pipeline)

export async function uploadVideo(app: FastifyInstance) {
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 1_848_576 * 25, // 25 MB
        }
    })
    app.post("/videos", async (request, response) => {
        const data = await request.file()

        if(!data) {
            return response.status(400).send({
                error: "No file uploaded",
            })
        }

        const extension = path.extname(data.filename)
        if(extension !== ".mp3") {
            return response.status(400).send({
                error: "Only mp3 files are allowed",
            })
        }

        const fileBaseName = path.basename(data.filename, extension)
        const fileUploadName = `${fileBaseName}-${Date.now()}${extension}`
        const filePath = path.resolve(__dirname, "../../uploads", fileUploadName)
        await pump(data.file, fs.createWriteStream(filePath))
        const video = await prisma.video.create({
            data: {
                name: data.filename,
                path: filePath,
            }
        })
        return {video}
    })
}