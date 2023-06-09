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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const discord_js_1 = require("discord.js");
const verifys_1 = require("../funcsSuporte/verifys");
const loader_1 = require("../utils/loader");
const moment_1 = __importDefault(require("moment"));
const moderation_1 = require("../db/moderation");
const messages_1 = require("../funcsSuporte/messages");
const satff_1 = require("../funcsSuporte/satff");
const roles = [
    loader_1.configData["roles"]["staff"]["asmodeus"],
    loader_1.configData["roles"]["staff"]["astaroth"]
];
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, verifys_1.verifyRoles)(interaction, roles))
            return yield interaction.reply({ content: "Sem permissão" });
        const time = new Date();
        const dt = new Date().setHours(time.getHours() - 3);
        let eR = new discord_js_1.EmbedBuilder()
            .setThumbnail(interaction.guild.iconURL());
        switch (interaction.message.embeds[0].title) {
            case "Banimento":
                eR.setTitle("Banimento");
                eR.setColor(0xed4245);
                for (const m of interaction.message.embeds[0].description.split("\n")) {
                    let user = yield loader_1.client.users.fetch(m.split(" ")[m.split(" ").length - 1].replace(/[<@>]/g, ""));
                    const author = yield interaction.guild.members.fetch(interaction.message.embeds[0].footer.text);
                    const aprovador = interaction.member;
                    const reason = interaction.message.embeds[0].fields[0].value;
                    try {
                        try {
                            eR.setFields({ name: "Banido por", value: `${author.user.username}`, inline: false }, { name: "Aprovador por", value: `${aprovador.user.username}`, inline: false }, { name: "Motivo", value: `${reason}`, inline: false }, { name: "Data", value: `${((0, moment_1.default)(new Date(dt))).format("DD/MM/YYYY HH:mm")}`, inline: false });
                            yield user.send({ embeds: [eR] });
                        }
                        catch (err) {
                        }
                        eR.setFields({ name: "Membro Banido", value: `${user.username}`, inline: false }, { name: "Banido por", value: `${author}`, inline: false }, { name: "Aprovador por", value: `${aprovador}`, inline: false }, { name: "Motivo", value: `${reason}`, inline: false }, { name: "Data", value: `${((0, moment_1.default)(new Date(dt))).format("DD/MM/YYYY HH:mm")}`, inline: false });
                        yield interaction.guild.bans.create(user.id, {
                            reason: reason,
                            deleteMessageSeconds: 604800
                        });
                        const channel = yield interaction.guild.channels.fetch(loader_1.configData["channels"]["modlog"]);
                        yield channel.send({
                            embeds: [eR]
                        });
                    }
                    catch (err) {
                        let msg = yield interaction.channel.send({ content: `Não conseguir banir o membro ${user.username}` });
                        (0, messages_1.msgDelete)(msg, 3000);
                    }
                    ;
                }
                (0, messages_1.msgDelete)(interaction.message, 0);
                return (0, moderation_1.RegsAtivos)(-1);
            case "Advertencia":
                eR.setTitle("Advertencia");
                eR.setColor(0xfee75c);
                for (const m of interaction.message.embeds[0].description.split("\n")) {
                    let member = yield interaction.guild.members.fetch(m.split(" ")[m.split(" ").length - 1].replace(/[<@>]/g, ""));
                    const author = yield interaction.guild.members.fetch(interaction.message.embeds[0].footer.text);
                    const aprovador = interaction.member;
                    const reason = interaction.message.embeds[0].fields[0].value;
                    try {
                        let vrf = yield (0, satff_1.functionAdvRoles)(member, author, aprovador, ((0, moment_1.default)(new Date(dt))).format("DD/MM/YYYY HH:mm"));
                        if (vrf != "adv3") {
                            yield (0, moderation_1.adcAdvertencia)(author, member, aprovador, reason, ((0, moment_1.default)(new Date(dt))).format("DD/MM/YYYY HH:mm"));
                            eR.setFields({ name: "Membro advertido", value: `${member}`, inline: false }, { name: "Advertido por", value: `${author}`, inline: false }, { name: "Aprovador por", value: `${aprovador}`, inline: false }, { name: "Motivo", value: `${reason}`, inline: false }, { name: "Data", value: `${((0, moment_1.default)(new Date(dt))).format("DD/MM/YYYY HH:mm")}`, inline: false });
                            const channel = yield interaction.guild.channels.fetch(loader_1.configData["channels"]["modlog"]);
                            yield channel.send({
                                embeds: [eR]
                            });
                        }
                    }
                    catch (err) {
                        let msg = yield interaction.channel.send({ content: `Não consegui adverter o membro ${member}` });
                        (0, messages_1.msgDelete)(msg, 3000);
                    }
                    ;
                }
                ;
                (0, messages_1.msgDelete)(interaction.message, 0);
                return (0, moderation_1.RegsAtivos)(-1);
            case "Adicionar cargo":
                for (const m of interaction.message.embeds[0].description.split("\n")) {
                    let member = yield interaction.guild.members.fetch(m.split(" ")[m.split(" ").length - 1].replace(/[<@>]/g, ""));
                    const role = interaction.message.embeds[0].fields[0].value.replace(/[<@&>]/g, "");
                    yield member.roles.add(role);
                }
                (0, messages_1.msgDelete)(interaction.message, 0);
                return (0, moderation_1.RegsAtivos)(-1);
            case "Remover cargo":
                for (const m of interaction.message.embeds[0].description.split("\n")) {
                    let member = yield interaction.guild.members.fetch(m.split(" ")[m.split(" ").length - 1].replace(/[<@>]/g, ""));
                    const role = interaction.message.embeds[0].fields[0].value.replace(/[<@&>]/g, "");
                    yield member.roles.remove(role);
                }
                (0, messages_1.msgDelete)(interaction.message, 0);
                return (0, moderation_1.RegsAtivos)(-1);
        }
    });
}
exports.execute = execute;
