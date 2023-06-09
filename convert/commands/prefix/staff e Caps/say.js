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
module.exports = {
    name: "say",
    description: "Envia uma mensagem",
    execute(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msg.content.toLowerCase().split(" ")[1])
                return yield msg.reply({ content: "Argumento canal necessario" });
            if (!msg.content.toLowerCase().split(" ")[2])
                return yield msg.reply({ content: "Argumento canal mensagem" });
            const channelId = msg.content.toLowerCase().split(" ")[1].replace(/[<#>]/gi, "");
            let args = "";
            for (const p of msg.content.split(" ")) {
                if (p != msg.content.split(" ")[0] && p != msg.content.split(" ")[1]) {
                    args += `${p} `;
                }
            }
            const channel = yield msg.guild.channels.fetch(channelId);
            yield channel.send({
                content: args,
            });
        });
    },
};
