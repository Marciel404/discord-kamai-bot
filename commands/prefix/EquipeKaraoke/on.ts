import { Message } from "discord.js"
import { configData } from "../../..";

export = {
    name: "on",
    aliases: [],
    description: "Poe em estado de indisponivel",
    roles: [],
    async execute(msg: Message) {
        await msg.reply({content: "Em desenvolvimento"})
    },
}