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
const loader_1 = require("../utils/loader");
const verifys_1 = require("../funcsSuporte/verifys");
const builders_1 = require("@discordjs/builders");
const roles = [
    loader_1.configData["roles"]["staff"]["asmodeus"],
    loader_1.configData["roles"]["staff"]["astaroth"],
    loader_1.configData["roles"]["capitaes_karaoke"],
    loader_1.configData["roles"]["capitaes_poem"],
    loader_1.configData["roles"]["capitaes_arte"],
    loader_1.configData["roles"]["capitaes_evento"]
];
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, verifys_1.verifyRoles)(interaction, roles))
            return yield interaction.reply({ content: "Sem permissão" });
        const initR = new builders_1.StringSelectMenuBuilder()
            .setCustomId("initRoles")
            .setPlaceholder("Cargos")
            .addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel("Adicionar")
            .setValue("adcRoles"), new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel("Remover")
            .setValue("rmvRoles"));
        const row = new builders_1.ActionRowBuilder()
            .addComponents(initR);
        yield interaction.reply({ content: "O que ira fazer?", components: [row], ephemeral: true });
    });
}
exports.execute = execute;
