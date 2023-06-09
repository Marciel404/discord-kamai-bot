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
const discord_js_1 = require("discord.js");
const verifys_1 = require("../../../funcsSuporte/verifys");
const loader_1 = require("../../../utils/loader");
module.exports = {
    name: "sendbuttonsstaff",
    aliases: ["sendbts"],
    roles: [
        loader_1.configData["roles"]["staff"]["asmodeus"],
        loader_1.configData["roles"]["staff"]["astaroth"]
    ],
    execute(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, verifys_1.verifyRoles)(msg, this.roles))
                return;
            const bBan = new discord_js_1.ButtonBuilder()
                .setCustomId("banButton")
                .setLabel("BAN")
                .setStyle(4);
            const bAdv = new discord_js_1.ButtonBuilder()
                .setCustomId("advertenciaButton")
                .setLabel("ADVERTENCIA")
                .setStyle(1);
            const bNtf = new discord_js_1.ButtonBuilder()
                .setCustomId("avisoButton")
                .setLabel("NOTIFICAR")
                .setStyle(2);
            const bCg = new discord_js_1.ButtonBuilder()
                .setCustomId("cargosButton")
                .setLabel("CARGOS")
                .setStyle(3);
            const row = new discord_js_1.ActionRowBuilder()
                .addComponents(bBan, bAdv, bNtf, bCg);
            yield msg.channel.send({ components: [row] });
            yield msg.delete();
        });
    }
};
