import { Message } from "discord.js"
import { configData } from "../../..";

export = {
    name: "anunciar_evento",
    aliases: ["anun_evento"],
    description: "Anuncia um evento",
    roles: [],
    async execute(msg: Message) {
        await msg.reply({content: "Em desenvolvimento"})
    },
}