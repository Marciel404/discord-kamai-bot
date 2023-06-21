import { SlashCommandBuilder } from "discord.js";
import { generateEmbedHelp } from "../../funcsSuporte/helps";

export = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Envia meus comandos"),
    name: "help",
    aliases: ["ajuda"],
    description: "Envia meus comandos",
    async execute(msg: any) {

        if (!msg.guild) return;

        await msg.reply({
            embeds: [generateEmbedHelp(msg)],
            ephemeral: true
        });

    }
};