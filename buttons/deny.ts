import { ButtonInteraction } from "discord.js";
import { verifyRolesPermissions } from "../funcsSuporte/verifys";
import { configData } from "..";

const roles: Array<any> = [
    configData["roles"]["staff"]["asmodeus"],
    configData["roles"]["staff"]["astaroth"]
]

export async function execute(interaction: ButtonInteraction) {

    if (verifyRolesPermissions(interaction.member!, roles) || interaction.user.id == interaction.message.embeds[0].footer!.text) {
        return await interaction.message.delete();
    }

    await interaction.reply({content:"Sem permissão", ephemeral: true});

}