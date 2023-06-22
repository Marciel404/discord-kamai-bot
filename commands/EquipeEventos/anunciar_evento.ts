import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";

export = {
    data: new SlashCommandBuilder()
    .setName("anunciar_evento")
    .setDescription("Anuncia um evento"),
    name: "anunciar_evento",
    aliases: ["anun_evento"],
    description: "Anuncia um evento",
    roles: [
        configData["roles"]["equipe_evento"],
        configData["roles"]["capitaes_evento"],
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute(msg: Message | ChatInputCommandInteraction) {
        if (!msg.guild) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return

        await msg.reply({content: "Em desenvolvimento"})
    },
}