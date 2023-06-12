import { Message } from "discord.js";
import { generateEmbedHelp } from "../../../funcsSuporte/helps";

module.exports = {
    name: "help",
    aliases: ["ajuda"],
    description: "Envia meus comandos",
    async execute(msg: Message) {
        
        await msg.reply({
            embeds: [generateEmbedHelp(msg)]
        })
    }
}