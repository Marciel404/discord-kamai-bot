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
const moderation_1 = require("../db/moderation");
function execute(interaction) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const valueI = interaction.values[0].split(" ");
        //await interaction.update({content:"Prontinho", embeds:[], components:[]})
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle(interaction.message.embeds[0].title)
            .setDescription(interaction.message.embeds[0].description)
            .setFooter({ text: interaction.message.embeds[0].footer.text });
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
        if (valueI[0] == "cap") {
            embed.addFields([{ name: `Cargo a ${(_a = interaction.message.embeds[0].title) === null || _a === void 0 ? void 0 : _a.split(" ")[0]}`, value: `<@&${loader_1.configData["roles"][`capitaes_${valueI[1]}`]}>` }]);
            yield interaction.channel.send({ embeds: [embed], components: [row] });
        }
        else {
            embed.addFields([{ name: `Cargo a ${(_b = interaction.message.embeds[0].title) === null || _b === void 0 ? void 0 : _b.split(" ")[0]}`, value: `<@&${loader_1.configData["roles"][`equipe_${valueI[0]}`]}>` }]);
            yield interaction.channel.send({ embeds: [embed], components: [row] });
        }
        ;
        yield interaction.update({ content: "Foi", embeds: [], components: [] });
        (0, moderation_1.RegsAtivos)(1);
    });
}
exports.execute = execute;
;
