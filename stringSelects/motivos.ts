import { 
    ActionRowBuilder,
    ButtonBuilder, 
    StringSelectMenuInteraction,
    EmbedBuilder
    } from "discord.js"
import { RegsAtivos, moddb } from "../db/moderation"
import { configData } from "../utils/loader"

const reason: any = {
    "1": "Flood/spam",
    "2": "Divulgação inadequada",
    "3": "Off topic/mensagem fora de tópico",
    "4": "Menção desnecessária de membros e cargos",
    "5": "Provocação e brigas",
    "6": "Poluição sonora",
    "7": "Atrapalhar o andamento do Karaokê",
    "8": "Denúncias falsas",
    "9": "Linguagem discriminatória",
    "10": "Exposição de membros/ Assédio",
    "11": "Preconceito, discriminação, difamação e/ou desrespeito",
    "12": "Planejar ou exercer raids no servidor",
    "13": "NSFW/ (+18)",
    "14": "Estimular ou praticar atividades ilegais ou que cause banimento de membros",
    "15": "Evasão de punição",
    "16": "Conteúdos graficamente chocantes",
    "17": "Quebra do ToS do Discord",
    "18": "Selfbot",
    "19": "Scam"
}

export async function execute (interaction: StringSelectMenuInteraction){
    const embed = new EmbedBuilder()
    .setTitle(interaction.message.embeds[0].title)
    .setDescription(interaction.message.embeds[0].description)
    .addFields([{name: "Motivo", value: reason[interaction.values[0]]}])
    .setFooter({text: interaction.message.embeds[0].footer!.text})

    let button1 = new ButtonBuilder();
    let button2 = new ButtonBuilder();

    if (interaction.message.embeds[0].title == "Banimento"){
        button1
        .setCustomId("confirmBan")
        .setLabel("✔")
        .setStyle(4)

        button2 = new ButtonBuilder()
        .setCustomId("deny")
        .setLabel("❌")
        .setStyle(4)

    } else if (interaction.message.embeds[0].title == "Advertencia"){
        button1
        .setCustomId("confirmAdvertencia")
        .setLabel("✔")
        .setStyle(4)

        button2 = new ButtonBuilder()
        .setCustomId("deny")
        .setLabel("❌")
        .setStyle(4)
    }

    const row = new ActionRowBuilder<any>()
    .addComponents(button1, button2)

    await interaction.update({content: "Foi", embeds: [], components: []})
    await interaction.channel?.send({embeds: [embed], components:[row]})

    RegsAtivos(1)
}
  
