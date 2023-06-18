import { Message } from "discord.js";
import { generateEmbedHelp } from "../../../funcsSuporte/helps";

export = {
    name: "help",
    aliases: ["ajuda"],
    description: "Envia meus comandos",
    async execute(msg: Message) {

        if (!msg.guild) return;

        await msg.reply({
            embeds: [generateEmbedHelp(msg)]
        });

    }
};