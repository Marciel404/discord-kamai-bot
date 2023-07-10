import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import { generateEmbedHelp } from "../../funcsSuporte/helps";
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";

export = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Envia meus comandos")
    .setDMPermission(false),
    name: "help",
    aliases: ["ajuda"],
    description: "Envia meus comandos",
    async execute(msg: Message | ChatInputCommandInteraction) {

        if (!msg.guild) return;

        if (!verifyRolesPermissions(msg.member!,[configData.roles.staff.staff1, configData.roles.staff.staff2]) && msg.channel?.id != configData["channels"]["commands"]) return

        await msg.reply({
            embeds: [generateEmbedHelp(msg)],
            ephemeral: true
        });

    }
};