import { ButtonInteraction, StringSelectMenuOptionBuilder } from "discord.js";
import { configData } from "..";
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

    const initR = new StringSelectMenuBuilder()
    .setCustomId("initRoles")
    .setPlaceholder("Cargos")
    .addOptions(
        new StringSelectMenuOptionBuilder()
        .setLabel("Adicionar")
        .setValue("adcRoles"),
        new StringSelectMenuOptionBuilder()
        .setLabel("Remover")
        .setValue("rmvRoles")
    )
    const row = new ActionRowBuilder<any>()
    .addComponents(initR)

    await interaction.reply({content: "O que ira fazer?", components: [row], ephemeral: true})

}