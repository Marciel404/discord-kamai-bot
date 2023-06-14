import { Message } from "discord.js"
import { configData } from "../../..";

export = {
    name: "teste4",
    aliases: [],
    description: "Envia uma mensagem",
    async execute(msg: Message) {
        await msg.reply({content: "tá certo"})
    },
}