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
exports.execute = void 0;
const discord_js_1 = require("discord.js");
const verifys_1 = require("../funcsSuporte/verifys");
const motivos_1 = require("../stringSelects/motivos");
const loader_1 = require("../utils/loader");
const messages_1 = require("../funcsSuporte/messages");
const roles = [
    loader_1.configData["roles"]["staff"]["staff1"],
    loader_1.configData["roles"]["staff"]["staff2"]
];
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, verifys_1.verifyRoles)(interaction, roles))
            return yield interaction.reply({ content: "Sem permissão", ephemeral: true });
        let selecMenu = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("motivos")
            .setMinValues(1)
            .setPlaceholder("Motivo da Notificação");
        for (const i of motivos_1.motivosList) {
            selecMenu.addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
                .setLabel(i["label"])
                .setEmoji(i["emoji"])
                .setValue(i["value"]));
        }
        const row = new discord_js_1.ActionRowBuilder()
            .addComponents(selecMenu);
        yield interaction.reply({ content: "Envie os ids", ephemeral: true });
        const collectorFilter = (m) => m.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter: collectorFilter, max: 1, time: 100000 });
        collector.on("collect", (message) => __awaiter(this, void 0, void 0, function* () {
            let desc = "";
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle("Notifação")
                .setFooter({ text: interaction.user.id });
            for (const i of message.content.split("\n")) {
                try {
                    let member = yield interaction.guild.members.fetch(i.replace(/[<@>]/g, ""));
                    desc += `${member}\n`;
                }
                catch (_a) {
                    let msg = yield interaction.channel.send({ content: `${i} não é um usuario no servidor` });
                    (0, messages_1.msgDelete)(msg, 3000);
                }
                ;
            }
            ;
            embed.setDescription(desc);
            yield interaction.editReply({
                content: "Qual motivo?",
                embeds: [embed],
                components: [row]
            });
            (0, messages_1.msgDelete)(message, 0);
        }));
    });
}
exports.execute = execute;
