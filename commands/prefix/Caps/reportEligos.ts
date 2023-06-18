import { Message } from "discord.js"
import { configData } from "../../..";

export = {
    name: "reporteligos",
    aliases: [],
    description: "Envia o report dos Eligos",
    roles: [
        configData["roles"]["staff"]["astaroth"],
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["capitaes_karaoke"]
    ],
    async execute(msg: Message) {
        await msg.reply({content: "Em desenvolvimento"})
    },
}