import { Message } from "discord.js"
import { configData } from "../../..";

export = {
    name: "reportnaberios",
    aliases: [],
    description: "Envia o report dos Naberios",
    roles: [
        configData["roles"]["staff"]["astaroth"],
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["capitaes_arte"]
    ],
    async execute(msg: Message) {
        await msg.reply({content: "Em desenvolvimento"})
    },
}