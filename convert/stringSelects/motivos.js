"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.motivosList = void 0;
const discord_js_1 = require("discord.js");
const satff_1 = require("../funcsSuporte/satff");
const moderation_1 = require("../db/moderation");
exports.motivosList = [
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
const reason = {
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
function execute(interaction) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle(interaction.message.embeds[0].title)
            .setDescription(interaction.message.embeds[0].description)
            .addFields([{ name: "Motivo", value: reason[interaction.values[0]] }])
            .setFooter({ text: interaction.message.embeds[0].footer.text });
        switch (interaction.message.embeds[0].title) {
            case "Notifação":
                (0, satff_1.notifyMember)(interaction, reason[interaction.values[0]]);
                return yield interaction.update({ content: "Foi", embeds: [], components: [] });
        }
        ;
        let button1 = new discord_js_1.ButtonBuilder()
            .setCustomId("confirm")
            .setLabel("✔")
            .setStyle(4);
        let button2 = new discord_js_1.ButtonBuilder()
            .setCustomId("deny")
            .setLabel("❌")
            .setStyle(4);
        const row = new discord_js_1.ActionRowBuilder()
            .addComponents(button1, button2);
        (0, moderation_1.RegsAtivos)(1);
        yield interaction.update({ content: "Foi", embeds: [], components: [] });
        yield ((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send({ embeds: [embed], components: [row] }));
    });
}
exports.execute = execute;
;
