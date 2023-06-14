import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder } from "discord.js";
import { configData } from "..";
import { verifyRoles } from "../funcsSuporte/verifys";
import { cargos2 } from "./initRoles";

const rolesD: Array<any> = [configData["roles"]["staff"]["asmodeus"], configData["roles"]["staff"]["astaroth"]];
const rolesE: Array<any> = [configData["roles"]["capitaes_karaoke"]]
const rolesV: Array<any> = [configData["roles"]["capitaes_poem"]]
const rolesN: Array<any> = [configData["roles"]["capitaes_arte"]]
const rolesG: Array<any> = [configData["roles"]["capitaes_evento"]]

export async function execute(interaction: StringSelectMenuInteraction){

    const cargoEquipe = new StringSelectMenuBuilder()
    .setCustomId("selectCargos2")
    const row = new ActionRowBuilder<any>()

    switch (interaction.values[0]) {
        case "eligos":
            if (verifyRoles(interaction,rolesD) || verifyRoles(interaction, rolesE)){
                for (const i of cargos2[interaction.values[0]]){
                    cargoEquipe.addOptions(
                        new StringSelectMenuOptionBuilder()
                        .setLabel(i["label"])
                        .setValue(i["value"])
                    )
                }
                return await interaction.update({components: [row.addComponents(cargoEquipe)]})
            }
            return await interaction.reply({content: "Sem permissão", ephemeral: true})

        case "vagantes":
            if (verifyRoles(interaction,rolesD) || verifyRoles(interaction, rolesV)){
                for (const i of cargos2[interaction.values[0]]){
                    cargoEquipe.addOptions(
                        new StringSelectMenuOptionBuilder()
                        .setLabel(i["label"])
                        .setValue(i["value"])
                    )
                }
                return await interaction.update({components: [row.addComponents(cargoEquipe)]})
            } 
            return await interaction.reply({content: "Sem permissão", ephemeral: true})

        case "naberios":
            if (verifyRoles(interaction,rolesD) || verifyRoles(interaction, rolesN)){
                for (const i of cargos2[interaction.values[0]]){
                    cargoEquipe.addOptions(
                        new StringSelectMenuOptionBuilder()
                        .setLabel(i["label"])
                        .setValue(i["value"])
                    )
                }
                return await interaction.update({components: [row.addComponents(cargoEquipe)]})
            } 
            return await interaction.reply({content: "Sem permissão", ephemeral: true})

        case "gremorys":
            if (verifyRoles(interaction,rolesD) || verifyRoles(interaction, rolesG)){
                for (const i of cargos2[interaction.values[0]]){
                    cargoEquipe.addOptions(
                        new StringSelectMenuOptionBuilder()
                        .setLabel(i["label"])
                        .setValue(i["value"])
                    )
                }
                return await interaction.update({components: [row.addComponents(cargoEquipe)]})
            } 
            return await interaction.reply({content: "Sem permissão", ephemeral: true})
    }
};