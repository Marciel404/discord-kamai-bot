import { Message } from "discord.js"
import { configData } from "../../..";

export = {
    name: "anunciar_evento",
    aliases: ["anun_evento"],
    description: "Anuncia um evento",
    roles: [
        configData["roles"]["equipe_evento"],
        configData["roles"]["capitaes_evento"],
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute(msg: Message) {
        await msg.reply({content: "Em desenvolvimento"})
    },
}