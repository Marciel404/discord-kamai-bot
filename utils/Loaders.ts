import { Routes, Collection } from "discord.js";
import fs from "fs";
import logger from "../logger";

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
                            logger.usage(msg.author, command)
                        } catch (err) {
                            logger.error(err)
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
    commands.pop()
    commandSlash.clear()
    try {
        let subFolderPath = fs.readdirSync(path)
        for (const name of subFolderPath) {
            if (fs.readdirSync(`${path}/${name}`).length >= 1) {
                let subFolderPath = fs.readdirSync(`${path}/${name}`).filter(file => file.endsWith(".ts") || file.endsWith(".js"))
                subFolderPath.forEach(async (commandName: string) => {
                    let command = require(`.${path}/${name}/${commandName}`)
                    if (command.data) {
                        commands.push(command.data.toJSON())
                        commandSlash.set(command.data.name, command)
                    };
                })
            }
        }
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
export async function loadSlash(CLIENT_ID: any) {
    let countNew: number = 0
    let countOld: number = 0
    /*
    Essa parte demora pra krlh mesmo, para funcionar o Reload de Comandos,
    mas só vai demorar para adicionar os novos, os antigos vão funcionar normalmente
    */
    console.log("Começando a registrar os SlashCommands")
    for (const command of commands) {

        try{
            let requestPost = await axios({
                method: "POST",
                url: `https://discord.com/api/v10/applications/${CLIENT_ID}/commands`,
                headers: {
                    Authorization: `Bot ${process.env.TOKEN}`
                },
                data: command
            })
    
            if (requestPost.status == 201) {
                countNew++
            } else if (requestPost.status == 200){
                countOld++
            }
        } catch (err){
            logger.error(err)
        }

        await new Promise(r => setTimeout(r, 5000));

    }

    console.log(`Registrei ${countNew} Slash Commands.`);
    console.log(`Já tinha ${countOld} Slash Commands registrados`)

};

loadCommandsSlash("./commands")
