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
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("abcquant")
        .setDescription("Teste1")
        .addIntegerOption((option) => option
        .setName("numero")
        .setDescription("Teste")
        .setRequired(true)),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (interaction.options.getChannel("channel") == null || interaction.options.getChannel("channel").type != ChannelType.GuildText) {
            //   return await interaction.reply(
            //     {
            //       content: "Você precisa digitar um canal valido",
            //       ephemeral: true
            //     }
            //   )
            // }
            const valor = interaction.options.get("numero")["value"];
            if (valor <= 0) {
                return yield interaction.reply({ content: "O numero precisa ser maior que 0", ephemeral: true });
            }
            const e = new discord_js_1.EmbedBuilder()
                .setTitle("testee");
            let x = 0;
            for (const i of (0, discord_js_1.range)({ start: valor, end: valor * 11, step: valor })) {
                x++;
                e.addFields({ name: `${interaction.options.get("numero")["value"]} x ${x}`, value: `${i}` });
            }
            yield interaction.reply({ embeds: [e], ephemeral: true });
        });
    },
};
