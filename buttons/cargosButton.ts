import { ButtonInteraction } from "discord.js";
import { configData } from "../utils/loader";
import { verifyRoles } from "../funcsSuporte/verifys";
import { ActionRowBuilder, StringSelectMenuBuilder } from "@discordjs/builders";

const roles: Array<any> = [
    configData["roles"]["staff"]["asmodeus"],
    configData["roles"]["staff"]["astaroth"],
    configData["roles"]["capitaes_karaoke"],
    configData["roles"]["capitaes_poem"],
    configData["roles"]["capitaes_arte"],
    configData["roles"]["capitaes_evento"]
]

export async function execute(interaction: ButtonInteraction) {
    if (!verifyRoles(interaction, roles)) return await interaction.reply({content: "Sem permissão"});

    const adc = new StringSelectMenuBuilder()
    .setCustomId("adcRoles")
    .setPlaceholder("Adicionar")
    const rmv = new StringSelectMenuBuilder()
    .setCustomId("rmvRoles")
    .setPlaceholder("Remover")
    const row = new ActionRowBuilder<any>()
    .addComponents(adc, rmv)

    await interaction.reply({content: "O que ira fazer?",components: [row], ephemeral: true})

}