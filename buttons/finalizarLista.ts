import { ButtonInteraction } from "discord.js";
import { configData } from "..";
import { verifyRolesPermissions } from "../funcsSuporte/verifys";

let roles: Array<any> = [
    configData["roles"]["staff"]["staff1"],
    configData["roles"]["staff"]["staff2"],
    configData["roles"]["staff"]["asmodeus"],
    configData["roles"]["equipe_evento"],
    configData["roles"]["capitaes_evento"]
]

export async function execute(interaction: ButtonInteraction){

    if (!verifyRolesPermissions(interaction.member!, roles)) return await interaction.reply({content:"Sem permissão", ephemeral: true})

    await interaction.reply({content:"Lista finalizada", ephemeral: true})
    await interaction.message.edit({components:[]})
}