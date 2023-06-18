import { Message } from "discord.js"
import { configData } from "../../..";

export = {
    name: "off",
    aliases: [],
    description: "Poe em estado de disponivel",
    roles: [],
    async execute(msg: Message) {
        await msg.reply({content: "Em desenvolvimento"})
    },
}