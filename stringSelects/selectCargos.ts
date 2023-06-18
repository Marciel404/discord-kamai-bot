import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder } from "discord.js";
import { configData } from "..";
import { verifyRolesPermissions } from "../funcsSuporte/verifys";
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
            if (verifyRolesPermissions(interaction.member!, rolesD) || verifyRolesPermissions(interaction.member!, rolesE)){
                for (const i of cargos2[interaction.values[0]]){
                    cargoEquipe.addOptions(
                        new StringSelectMenuOptionBuilder()
                        .setLabel(i["label"])
                        .setValue(i["value"])
                    )
                }
                return await interaction.update({components: [row.addComponents(cargoEquipe)]})
            }
            await interaction.reply({content: "Sem permissão", ephemeral: true})
            break

        case "vagantes":
            if (verifyRolesPermissions(interaction.member!, rolesD) || verifyRolesPermissions(interaction.member!, rolesV)){
                for (const i of cargos2[interaction.values[0]]){
                    cargoEquipe.addOptions(
                        new StringSelectMenuOptionBuilder()
                        .setLabel(i["label"])
                        .setValue(i["value"])
                    )
                }
                return await interaction.update({components: [row.addComponents(cargoEquipe)]})
            } 
            await interaction.reply({content: "Sem permissão", ephemeral: true})
            break

        case "naberios":
            if (verifyRolesPermissions(interaction.member!, rolesD) || verifyRolesPermissions(interaction.member!, rolesN)){
                for (const i of cargos2[interaction.values[0]]){
                    cargoEquipe.addOptions(
                        new StringSelectMenuOptionBuilder()
                        .setLabel(i["label"])
                        .setValue(i["value"])
                    )
                }
                return await interaction.update({components: [row.addComponents(cargoEquipe)]})
            } 
            await interaction.reply({content: "Sem permissão", ephemeral: true})
            break

        case "gremorys":
            if (verifyRolesPermissions(interaction.member!, rolesD) || verifyRolesPermissions(interaction.member!, rolesG)){
                for (const i of cargos2[interaction.values[0]]){
                    cargoEquipe.addOptions(
                        new StringSelectMenuOptionBuilder()
                        .setLabel(i["label"])
                        .setValue(i["value"])
                    )
                }
                return await interaction.update({components: [row.addComponents(cargoEquipe)]})
            } 
            await interaction.reply({content: "Sem permissão", ephemeral: true})
            break
    }
};