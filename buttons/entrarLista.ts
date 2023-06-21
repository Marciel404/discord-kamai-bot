import { ButtonInteraction, EmbedBuilder } from "discord.js";

export async function execute(interaction: ButtonInteraction){

    var e = interaction.message.embeds[0]

    let descriptionEmbed = "";
    if (e.description != null) descriptionEmbed = e.description;
    

    if (descriptionEmbed.indexOf(`${interaction.user}`) >= 0){
        return await interaction.reply({content: "Você já está na lista", ephemeral: true})
    }

    let e2 = new EmbedBuilder();
    try {
        e2
        .setTitle("Lista participantes")
        .setDescription(descriptionEmbed += `\n${interaction.user}`)
    } catch (err) {
    }

    await interaction.message.edit({embeds: [e2]})

    await interaction.reply({content: "Adicionado a lista", ephemeral: true})

}