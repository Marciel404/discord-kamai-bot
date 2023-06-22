import { StringSelectMenuInteraction } from "discord.js";
import { row } from "../funcsSuporte/components";

export async function execute(interaction: StringSelectMenuInteraction) {

    await interaction.deferReply({ephemeral: true})

    await interaction.message.edit({components: [row(interaction.component)!]})

    await interaction.followUp({content:'Criando ticket', ephemeral: true})
    
}