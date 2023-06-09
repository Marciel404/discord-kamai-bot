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
const verifys_1 = require("../funcsSuporte/verifys");
const loader_1 = require("../utils/loader");
const moderation_1 = require("../db/moderation");
const roles = [
    loader_1.configData["roles"]["staff"]["asmodeus"],
    loader_1.configData["roles"]["staff"]["astaroth"]
];
function execute(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((0, verifys_1.verifyRoles)(interaction, roles) || interaction.user.id == interaction.message.embeds[0].footer.text) {
            yield interaction.message.delete();
            return (0, moderation_1.RegsAtivos)(-1);
        }
        return yield interaction.reply({ content: "Sem permissão", ephemeral: true });
    });
}
exports.execute = execute;
