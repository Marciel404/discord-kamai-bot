import { Message } from "discord.js"
import { configData } from "../../..";

export = {
    name: "teste14",
    aliases: [],
    description: "Envia uma mensagem",
    async execute(msg: Message) {
        await msg.reply({content: "tá certo"})
    },
}