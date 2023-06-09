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
exports.client = exports.configData = void 0;
const discord_js_1 = require("discord.js");
const commandsLoader_1 = require("./commandsLoader");
const moderation_1 = require("../db/moderation");
const verifys_1 = require("../funcsSuporte/verifys");
exports.configData = require(`./config${process.env.bot}.json`);
exports.client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildModeration,
    ]
});
exports.client.once("ready", ((self) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    (0, commandsLoader_1.loadSlash)((_a = self.application) === null || _a === void 0 ? void 0 : _a.id);
    console.log("Eu entrei como " + ((_b = self.user) === null || _b === void 0 ? void 0 : _b.username));
    (0, verifys_1.verifyRegChannelName)(self, exports.configData, moderation_1.moddb);
})));
exports.client.on("messageCreate", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (!msg.content.startsWith(exports.configData.prefix) || msg.author.bot || !msg.guild)
        return;
    const commandName = msg.content.toLowerCase().split(" ")[0].substring(exports.configData.prefix.length);
    if (commandName.length == 0)
        return;
    const command = commandsLoader_1.commandPrefix.get(commandName);
    try {
        yield command.execute(msg);
    }
    catch (err) {
        if (String(err).includes("Cannot read properties of undefined (reading 'execute')")) {
            yield msg.reply({ content: `Não encontrei o comando ${commandName} nos meus comandos` });
        }
        else {
            yield msg.reply({ content: `Error: ${err}` });
        }
        ;
    }
    ;
}));
exports.client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (interaction.isChatInputCommand()) {
        const command = commandsLoader_1.commandSlash.get(interaction.commandName);
        if (!command) {
            return console.error(`No command matching ${interaction.commandName} was found.`);
        }
        ;
        try {
            yield command.execute(interaction);
        }
        catch (error) {
            if (interaction.replied || interaction.deferred) {
                yield interaction.followUp({ content: `${error}`, ephemeral: true });
            }
            else {
                yield interaction.reply({ content: `${error}`, ephemeral: true });
            }
            ;
        }
        ;
    }
    else if (interaction.isButton()) {
        try {
            yield require(`../buttons/${interaction.customId}.js`).execute(interaction);
        }
        catch (err) {
            console.log(err);
        }
        ;
    }
    else if (interaction.isStringSelectMenu()) {
        try {
            yield require(`../stringSelects/${interaction.customId}.js`).execute(interaction);
        }
        catch (err) {
            console.log(err);
        }
        ;
    }
    ;
}));
