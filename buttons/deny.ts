import { ButtonInteraction } from "discord.js";
import { verifyRoles } from "../funcsSuporte/verifys";
import { configData } from "..";
const {RegsAtivos} = require("../db/moderation")

const roles: Array<any> = [
    configData["roles"]["staff"]["asmodeus"],
    configData["roles"]["staff"]["astaroth"]
]

export async function execute(interaction: ButtonInteraction) {

    if (verifyRoles(interaction, roles) || interaction.user.id == interaction.message.embeds[0].footer!.text) {
        await interaction.message.delete();
        return RegsAtivos(-1);
    }

    return await interaction.reply({content:"Sem permissão", ephemeral: true});

}