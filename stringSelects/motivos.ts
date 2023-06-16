import { 
    ActionRowBuilder,
    ButtonBuilder, 
    StringSelectMenuInteraction,
    EmbedBuilder
    } from "discord.js";

import { notifyMember } from "../funcsSuporte/satff";
const {RegsAtivos} = require("../db/moderation")

export const motivosList = [
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Flood/spam.',
        "value": '1',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Divulgação inadequada.',
        "value": '2',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Off topic/mensagem fora de tópico.',
        "value": '3',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Menção desnecessária de membros e cargos.',
        "value": '4',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Provocação e brigas.',
        "value": '5',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Poluição sonora.',
        "value": '6',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Atrapalhar o andamento do Karaokê.',
        "value": '7',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Denúncias falsas.',
        "value": '8',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Linguagem discriminatória.',
        "value": '9',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Exposição de membros/ Assédio.',
        "value": '10',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Preconceito, discriminação, difamação e/ou desrespeito.',
        "value": '11',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Planejar ou exercer raids no servidor.',
        "value": '12',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'NSFW/ (+18).',
        "value": '13',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Estimular ou praticar atividades ilegais ou que cause banimento de membros.',
        "value": '14',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Evasão de punição.',
        "value": '15',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Conteúdos graficamente chocantes.',
        "value": '16',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Quebra do ToS do Discord.',
        "value": '17',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Selfbot.',
        "value": '18',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Scam.',
        "value": '19',
    },
];

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
};

export async function execute(interaction: StringSelectMenuInteraction){

    const embed = new EmbedBuilder()
    .setTitle(interaction.message.embeds[0].title)
    .setDescription(interaction.message.embeds[0].description)
    .addFields([{name: "Motivo", value: reason[interaction.values[0]]}])
    .setFooter({text: interaction.message.embeds[0].footer!.text});

    switch ( interaction.message.embeds[0].title){

        case "Notifação":
            notifyMember(interaction, reason[interaction.values[0]]);
            return await interaction.update({content: "Foi", embeds: [], components: []});
    };

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

    await interaction.update({content: "Foi", embeds: [], components: []});
    await interaction.channel!.send({embeds: [embed], components:[row]});
    
};