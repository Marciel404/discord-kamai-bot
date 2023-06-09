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
exports.functionAdvRoles = exports.notifyMember = void 0;
const discord_js_1 = require("discord.js");
const loader_1 = require("../utils/loader");
const verifys_1 = require("./verifys");
const moment_1 = __importDefault(require("moment"));
function notifyMember(interaction, reason) {
    return __awaiter(this, void 0, void 0, function* () {
        const time = new Date();
        const dt = new Date().setHours(time.getHours() - 3);
        let eR = new discord_js_1.EmbedBuilder()
            .setTitle("Notificação")
            .setThumbnail(interaction.guild.iconURL())
            .setColor(0x57f287);
        for (const m of interaction.message.embeds[0].description.split("\n")) {
            let member = yield interaction.guild.members.fetch(m.split(" ")[m.split(" ").length - 1].replace(/[<@>]/g, ""));
            const author = interaction.member;
            try {
                eR.setDescription(`
Olá tudo bem? Você recebeu uma notificação pelo\n
motivo: ${reason}\n
Lembre-se, notificação não possui peso, você \
não sofreu advertência ou algo que gere seu \
banimento. As notificações existem apenas para \
te deixar mais por dentro do assunto.
Ou seja, relaxe`);
                yield member.send({
                    embeds: [eR]
                });
                eR.setDescription(" ");
                eR.setFields({ name: "Membro Notificado", value: `${member}`, inline: false }, { name: "Notificado por por", value: `${author}`, inline: false }, { name: "Motivo", value: `${reason}`, inline: false }, { name: "Data", value: `${((0, moment_1.default)(new Date(dt))).format("DD/MM/YYYY HH:mm")}`, inline: false });
                const channel = yield interaction.guild.channels.fetch(loader_1.configData["channels"]["modlog"]);
                yield channel.send({
                    embeds: [eR]
                });
            }
            catch (err) {
                eR.setDescription(" ");
                eR.setFields({ name: "Membro Notificado", value: `${member}`, inline: false }, { name: "Notificado por por", value: `${author}`, inline: false }, { name: "Motivo", value: `${reason}`, inline: false }, { name: "Data", value: `${((0, moment_1.default)(new Date(dt))).format("DD/MM/YYYY HH:mm")}`, inline: false });
                const channel = yield interaction.guild.channels.fetch(loader_1.configData["channels"]["modlog"]);
                yield channel.send({
                    content: `${member}`,
                    embeds: [eR]
                });
            }
            ;
        }
        ;
    });
}
exports.notifyMember = notifyMember;
function functionAdvRoles(member, author, aprovador, dt) {
    return __awaiter(this, void 0, void 0, function* () {
        const roles = [loader_1.configData["roles"]["adv1"], loader_1.configData["roles"]["adv2"], loader_1.configData["roles"]["adv3"]];
        let v = yield (0, verifys_1.verifyAdvertenciaEntry)(member);
        if (!v) {
            yield member.timeout(120 * 60 * 1000, "Advertencia 1");
            return yield member.roles.add(roles[0]);
        }
        for (const r of Object.values(member.roles)[0]["_roles"]) {
            let eR = new discord_js_1.EmbedBuilder()
                .setThumbnail(member.guild.iconURL())
                .setColor(0xed4245);
            switch (r) {
                case roles[2]:
                    eR.setTitle("Banimento");
                    try {
                        eR.setFields({ name: "Banido por", value: `${author.user.username}`, inline: false }, { name: "Aprovador por", value: `${aprovador.user.username}`, inline: false }, { name: "Motivo", value: `Acumulo de advertencia`, inline: false }, { name: "Data", value: `${dt}`, inline: false });
                        yield member.send({ embeds: [eR] });
                    }
                    catch (err) {
                    }
                    eR.setFields({ name: "Membro Banido", value: `${member.user.username}`, inline: false }, { name: "Banido por", value: `${author}`, inline: false }, { name: "Aprovador por", value: `${aprovador}`, inline: false }, { name: "Motivo", value: `Acumulo de advertencia`, inline: false }, { name: "Data", value: `${dt}`, inline: false });
                    yield member.guild.bans.create(member.id, {
                        reason: "Acumulo de Advertencia",
                        deleteMessageSeconds: 604800
                    });
                    const channel = yield member.guild.channels.fetch(loader_1.configData["channels"]["modlog"]);
                    yield channel.send({
                        embeds: [eR]
                    });
                    return "adv3";
                case roles[1]:
                    yield member.timeout(2880 * 60 * 1000, "Advertencia 1");
                    return yield member.roles.add([roles[0], roles[1], roles[2]]);
                case roles[0]:
                    yield member.timeout(720 * 60 * 1000, "Advertencia 1");
                    return yield member.roles.add([roles[0], roles[1]]);
            }
        }
        ;
    });
}
exports.functionAdvRoles = functionAdvRoles;
