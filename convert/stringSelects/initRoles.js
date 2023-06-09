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
exports.execute = exports.cargos2 = void 0;
const discord_js_1 = require("discord.js");
const messages_1 = require("../funcsSuporte/messages");
const cargos1 = [
    {
        "label": "Eligos",
        "value": "eligos",
    },
    {
        "label": "Vagantes",
        "value": "vagantes"
    },
    {
        "label": "Naberios",
        "value": "naberios"
    },
    {
        "label": "Gremorys",
        "value": "gremorys"
    }
];
exports.cargos2 = {
    "eligos": [
        {
            "label": "Capitão Eligo",
            "value": "cap karaoke"
        },
        {
            "label": "Eligo",
            "value": "karaoke",
        }
    ],
    "vagantes": [
        {
            "label": "Capitão Ose",
            "value": "cap poem",
        },
        {
            "label": "Vagante",
            "value": "poem"
        }
    ],
    "naberios": [
        {
            "label": "Capitão Naberios",
            "value": "cap arte",
        },
        {
            "label": "Naberio",
            "value": "arte"
        },
    ],
    "gremorys": [
        {
            "label": "Capitão Gremory",
            "value": "cap evento",
        },
        {
            "label": "Gremory",
            "value": "evento"
        },
    ]
};
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        let cargos = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("selectCargos")
            .setMinValues(1)
            .setPlaceholder("Qual equipe");
        for (const i of cargos1) {
            cargos.addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
                .setLabel(i["label"])
                .setValue(i["value"]));
        }
        ;
        const row = new discord_js_1.ActionRowBuilder()
            .addComponents(cargos);
        if (interaction.values[0] === "adcRoles") {
            yield interaction.update({ content: "Envie os ids", components: [] });
            const collectorFilter = (m) => m.author.id === interaction.user.id;
            const collector = interaction.channel.createMessageCollector({ filter: collectorFilter, max: 1, time: 100000 });
            collector.on("collect", (message) => __awaiter(this, void 0, void 0, function* () {
                let embed = new discord_js_1.EmbedBuilder()
                    .setTitle("Adicionar cargo")
                    .setFooter({ text: interaction.user.id });
                let desc = "";
                const client = yield interaction.guild.members.fetch(interaction.client.user.id);
                for (const i of message.content.split("\n")) {
                    try {
                        let member = yield interaction.guild.members.fetch(i.replace(/[<@>]/g, ""));
                        if (member.roles.highest.position >= client.roles.highest.position) {
                            let msg = yield interaction.channel.send({ content: `Não consego adicionar cargo a o membro ${member}` });
                            yield (0, messages_1.msgDelete)(msg, 3000);
                        }
                        else {
                            desc += `${member}\n`;
                        }
                    }
                    catch (_a) {
                        let msg = yield interaction.channel.send({ content: `${i.replace(/[<@>]/g, "")} não é um usuario ou não está no servidor` });
                        yield (0, messages_1.msgDelete)(msg, 3000);
                    }
                    ;
                }
                if (desc.length == 0) {
                    yield interaction.editReply({ content: "Não consegui adicionar cargo a ninguem" });
                    (0, messages_1.msgDelete)(message, 0);
                    return;
                }
                ;
                embed.setDescription(desc);
                (0, messages_1.msgDelete)(message, 0);
                yield interaction.editReply({
                    content: "Qual Cargo?",
                    embeds: [embed],
                    components: [row]
                });
            }));
        }
        else {
            yield interaction.update({ content: "Envie os ids", components: [] });
            const collectorFilter = (m) => m.author.id === interaction.user.id;
            const collector = interaction.channel.createMessageCollector({ filter: collectorFilter, max: 1, time: 100000 });
            collector.on("collect", (message) => __awaiter(this, void 0, void 0, function* () {
                let embed = new discord_js_1.EmbedBuilder()
                    .setTitle("Remover cargo")
                    .setFooter({ text: interaction.user.id });
                let desc = "";
                const client = yield interaction.guild.members.fetch(interaction.client.user.id);
                for (const i of message.content.split("\n")) {
                    try {
                        let member = yield interaction.guild.members.fetch(i.replace(/[<@>]/g, ""));
                        if (member.roles.highest.position >= client.roles.highest.position) {
                            let msg = yield interaction.channel.send({ content: `Não consego adicionar cargo a o membro ${member}` });
                            (0, messages_1.msgDelete)(msg, 3000);
                        }
                        else {
                            desc += `${member}\n`;
                        }
                        ;
                    }
                    catch (_b) {
                        let msg = yield interaction.channel.send({ content: `${i.replace(/[<@>]/g, "")} não é um usuario ou não está no servidor` });
                        (0, messages_1.msgDelete)(msg, 3000);
                    }
                    ;
                }
                ;
                if (desc.length == 0) {
                    yield interaction.editReply({ content: "Não consegui adicionar cargo a ninguem" });
                    (0, messages_1.msgDelete)(message, 0);
                    return;
                }
                ;
                embed.setDescription(desc);
                (0, messages_1.msgDelete)(message, 0);
                yield interaction.editReply({
                    content: "Qual Cargo?",
                    embeds: [embed],
                    components: [row]
                });
            }));
        }
        ;
    });
}
exports.execute = execute;
;
