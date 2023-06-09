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
const initRoles_1 = require("./initRoles");
const rolesD = [loader_1.configData["roles"]["staff"]["asmodeus"], loader_1.configData["roles"]["staff"]["astaroth"]];
const rolesE = [loader_1.configData["roles"]["capitaes_karaoke"]];
const rolesV = [loader_1.configData["roles"]["capitaes_poem"]];
const rolesN = [loader_1.configData["roles"]["capitaes_arte"]];
const rolesG = [loader_1.configData["roles"]["capitaes_evento"]];
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const cargoEquipe = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("selectCargos2");
        const row = new discord_js_1.ActionRowBuilder();
        switch (interaction.values[0]) {
            case "eligos":
                if ((0, verifys_1.verifyRoles)(interaction, rolesD) || (0, verifys_1.verifyRoles)(interaction, rolesE)) {
                    for (const i of initRoles_1.cargos2[interaction.values[0]]) {
                        cargoEquipe.addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
                            .setLabel(i["label"])
                            .setValue(i["value"]));
                    }
                    return yield interaction.update({ components: [row.addComponents(cargoEquipe)] });
                }
                return yield interaction.reply({ content: "Sem permissão", ephemeral: true });
            case "vagantes":
                if ((0, verifys_1.verifyRoles)(interaction, rolesD) || (0, verifys_1.verifyRoles)(interaction, rolesV)) {
                    for (const i of initRoles_1.cargos2[interaction.values[0]]) {
                        cargoEquipe.addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
                            .setLabel(i["label"])
                            .setValue(i["value"]));
                    }
                    return yield interaction.update({ components: [row.addComponents(cargoEquipe)] });
                }
                return yield interaction.reply({ content: "Sem permissão", ephemeral: true });
            case "naberios":
                if ((0, verifys_1.verifyRoles)(interaction, rolesD) || (0, verifys_1.verifyRoles)(interaction, rolesN)) {
                    for (const i of initRoles_1.cargos2[interaction.values[0]]) {
                        cargoEquipe.addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
                            .setLabel(i["label"])
                            .setValue(i["value"]));
                    }
                    return yield interaction.update({ components: [row.addComponents(cargoEquipe)] });
                }
                return yield interaction.reply({ content: "Sem permissão", ephemeral: true });
            case "gremorys":
                if ((0, verifys_1.verifyRoles)(interaction, rolesD) || (0, verifys_1.verifyRoles)(interaction, rolesG)) {
                    for (const i of initRoles_1.cargos2[interaction.values[0]]) {
                        cargoEquipe.addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
                            .setLabel(i["label"])
                            .setValue(i["value"]));
                    }
                    return yield interaction.update({ components: [row.addComponents(cargoEquipe)] });
                }
                return yield interaction.reply({ content: "Sem permissão", ephemeral: true });
        }
    });
}
exports.execute = execute;
;
