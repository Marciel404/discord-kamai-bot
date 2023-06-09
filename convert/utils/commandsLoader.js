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
exports.loadSlash = exports.loadCommandsSlash = exports.loadCommandsPrefix = exports.commandPrefix = exports.commandSlash = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const { REST } = require("discord.js");
const rest = new REST().setToken(process.env.token);
let commands = [];
exports.commandSlash = new discord_js_1.Collection();
exports.commandPrefix = new discord_js_1.Collection();
function loadCommandsPrefix(path) {
    try {
        fs_1.default.readdir(path, (error, subFolderPath) => {
            for (const name of subFolderPath) {
                fs_1.default.readdir(`${path}/${[name]}`, (error, files) => {
                    files.forEach((files) => {
                        if (files.endsWith(".js")) {
                            let command = require(`.${path}/${name}/${files}`);
                            exports.commandPrefix.set(command.name, command);
                            if (command.aliases && command.aliases.length >= 1) {
                                for (const i in command.aliases) {
                                    exports.commandPrefix.set(command.aliases[i], command);
                                }
                                ;
                            }
                            ;
                        }
                        ;
                    });
                });
            }
            ;
        });
    }
    catch (err) {
        console.log(err);
    }
    ;
}
exports.loadCommandsPrefix = loadCommandsPrefix;
;
function loadCommandsSlash(path) {
    try {
        fs_1.default.readdir(path, (error, subFolderPath) => {
            for (const name of subFolderPath) {
                fs_1.default.readdir(`${path}/${[name]}`, (error, files) => {
                    files.forEach((files) => {
                        if (files.endsWith(".js")) {
                            let command = require(`.${path}/${name}/${files}`);
                            commands.push(command.data);
                            exports.commandSlash.set(command.data.name, command);
                        }
                        ;
                    });
                });
            }
            ;
        });
    }
    catch (err) {
        console.log(err);
    }
    ;
}
exports.loadCommandsSlash = loadCommandsSlash;
;
function loadSlash(CLIENT_ID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield rest.put(discord_js_1.Routes.applicationCommands(CLIENT_ID), { body: commands });
            console.log(`Registrei ${data.length} Slash Commands.`);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.loadSlash = loadSlash;
loadCommandsSlash("./commands/slash");
loadCommandsPrefix("./commands/prefix");
