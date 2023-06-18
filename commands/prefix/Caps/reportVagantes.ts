import { Message } from "discord.js"
import { configData } from "../../..";

export = {
    name: "reportvagantes",
    aliases: [],
    description: "Envia o report dos vagantes",
    roles: [
        configData["roles"]["staff"]["astaroth"],
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["capitaes_poem"]
    ],
    async execute(msg: Message) {
        await msg.reply({content: "Em desenvolvimento"})
    },
}