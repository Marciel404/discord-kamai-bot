import { ButtonInteraction } from "discord.js";
import { verifyRoles } from "../funcsSuporte/verifyRoles";
import { configData } from "../utils/loader";

const roles: Array<any> = [
    configData["roles"]["staff"]["asmodeus"],
    configData["roles"]["staff"]["astaroth"]
]

export async function execute(interaction: ButtonInteraction) {

    if (!verifyRoles(interaction, roles) || interaction.user.id != interaction.message.embeds[0].footer!.text) {
        return await interaction.reply({content:"Sem permissão", ephemeral: true})
    }

    await interaction.message.delete()

}
