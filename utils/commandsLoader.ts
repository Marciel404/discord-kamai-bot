import { Routes, Collection } from "discord.js";
import fs from "fs";
import { configData } from "./loader";

const {REST} = require("discord.js");
const rest = new REST().setToken(process.env.token);
let commands: Array<String> = [];

export const commandSlash: Collection<any, any> = new Collection();
export const commandPrefix: Collection<any, any> = new Collection();
export function loadCommandsPrefix(path: fs.PathLike){
    try {
        fs.readdir(path, (error, subFolderPath: Array<String>) => {
            for (const name of subFolderPath ) {
                fs.readdir(`${path}/${name}`, (error, files: string[]) => {
                    files.forEach((files: string) => {
                        if (files.endsWith(configData.lang)) {
                            let command = require(`.${path}/${name}/${files}`)
                            commandPrefix.set(command.name, command)
                            if (command.aliases && command.aliases.length >= 1) {
                                for (const i in command.aliases) {
                                    commandPrefix.set(command.aliases[i], command)
                                };
                            };
                        };
                    });
                });
            };
        });
    } catch (err) {
        console.log(err)
    };
};
export function loadCommandsSlash(path: fs.PathLike) {
    try {

        fs.readdir(path, (error, subFolderPath: Array<String>) => {
            for (const name of subFolderPath){
                fs.readdir(`${path}/${[name]}`, (error, files: String[]) => {
                    files.forEach((files: String) => {
                        if (files.endsWith(configData.lang)) {
                            let command = require(`.${path}/${name}/${files}`)
                            commands.push(command.data)
                            commandSlash.set(command.data.name, command)
                        };
                    });
                });
            };
        });

    } catch (err) {
        console.log(err)
    };

};
export async function loadSlash(CLIENT_ID: any){

    try {
        const data = await rest.put(Routes.applicationCommands(CLIENT_ID),{ body: commands });
        console.log(`Registrei ${data.length} Slash Commands.`);
    } catch (error) {

        console.log(error);
    }
}
loadCommandsSlash("./commands/slash")
loadCommandsPrefix("./commands/prefix")