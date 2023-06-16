import { ButtonInteraction } from "discord.js";
import { verifyRoles } from "../funcsSuporte/verifys";
import { configData } from "..";

const roles: Array<any> = [
    configData["roles"]["staff"]["asmodeus"],
    configData["roles"]["staff"]["astaroth"]
]

export async function execute(interaction: ButtonInteraction) {

    if (verifyRoles(interaction, roles) || interaction.user.id == interaction.message.embeds[0].footer!.text) {
        await interaction.message.delete();
    }

    return await interaction.reply({content:"Sem permissão", ephemeral: true});

}