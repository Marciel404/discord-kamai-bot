import {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    StringSelectMenuInteraction
    } from "discord.js";
import { configData } from "..";

export async function execute(interaction: StringSelectMenuInteraction){
    
    const valueI = interaction.values[0].split(" ");
    //await interaction.update({content:"Prontinho", embeds:[], components:[]})
    const embed = new EmbedBuilder()
    .setTitle(interaction.message.embeds[0].title)
    .setDescription(interaction.message.embeds[0].description)
    .setFooter({text: interaction.message.embeds[0].footer!.text});

    let button1 = new ButtonBuilder()
    .setCustomId("confirm")
    .setLabel("✔")
    .setStyle(4);

    let button2 = new ButtonBuilder()
    .setCustomId("deny")
    .setLabel("❌")
    .setStyle(4);

    const row = new ActionRowBuilder<any>()
    .addComponents(button1, button2);

    if (valueI[0] == "cap"){
        embed.addFields([{name: `Cargo a ${interaction.message.embeds[0].title?.split(" ")[0]}`, value: `<@&${configData["roles"][`capitaes_${valueI[1]}`]}>`}])
        await interaction.channel!.send({embeds:[embed], components: [row]})
    } else {
        embed.addFields([{name: `Cargo a ${interaction.message.embeds[0].title?.split(" ")[0]}`, value: `<@&${configData["roles"][`equipe_${valueI[0]}`]}>`}])
        await interaction.channel!.send({embeds:[embed], components: [row]})
    };
    await interaction.update({content: "Foi", embeds: [], components: []})
};