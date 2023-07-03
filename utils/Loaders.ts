import { Routes, Collection } from "discord.js";
import fs from "fs";

const {REST} = require("discord.js");
const rest = new REST().setToken(process.env.token);
let commands: Array<string> = [];

export const commandSlash: Collection<any, any> = new Collection();
export async function loadCommandsPrefix(path:  fs.PathLike, command: string = "none", msg: any = null){
    if (command == "none") return
    try{
        let subFolderPath = fs.readdirSync(path)
        for (const name of subFolderPath){
            if (fs.readdirSync(`${path}/${name}`).length >= 1){
                let subFolderPath = fs.readdirSync(`${path}/${name}`).filter(file => file.endsWith(".ts") || file.endsWith(".js"))
                subFolderPath.forEach( async commandName => {
                    let cmd =  require(`.${path}/${name}/${commandName}`)
                    if (cmd && cmd.name == `${command}` || cmd.aliases && cmd.aliases.includes(command)){
                        try {
                            await cmd.execute(msg)
                        } catch (err) {
                            await msg.reply({content: `${err}`})
                        };
                    };
                });
            };
        };
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
                        if (files.endsWith(".ts") || files.endsWith(".js")) {
                            let command = require(`.${path}/${name}/${files}`)
                            if (command.data){
                                commands.push(command.data)
                                commandSlash.set(command.data.name, command)
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
export function loadEvents(path: string) {

    let events = fs.readdirSync(path)
    for (const name of events){
        if (name.endsWith(".ts") || name.endsWith(".js")){
            require(`.${path}/${name}`)
        } else {
            const subevents = fs.readdirSync(`${path}/${name}`)
            for (const subName of subevents){
                if (subName.endsWith(".ts") || subName.endsWith(".js")){
                    require(`.${path}/${name}/${subName}`)
                };
            };
        };
    };
};
export async function loadSlash(CLIENT_ID: any){

    try {
        const data = await rest.put(Routes.applicationCommands(CLIENT_ID),{ body: commands });
        console.log(`Registrei ${data.length} Slash Commands.`);
    } catch (error) {
        console.log(error);
    };
};

loadCommandsSlash("./commands")
