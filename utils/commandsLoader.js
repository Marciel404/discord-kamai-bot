const { REST, Routes, Collection } = require("discord.js");
const fs = require("fs");
const configData = require(`./config${process.env.bot}.json`)
const rest = new REST().setToken(process.env.token);

const commandSlash  = new Collection();
const commandPrefix = new Collection();

let commands = [];

function loadCommandsPrefix(path){
    try {
        fs.readdir(path, (error, subFolderPath) => {
            for (const name of subFolderPath) {
                fs.readdir(`${path}/${[name]}`, (error, files) => {
                    files.forEach((files) => {
                        if (files.endsWith(".js")) {
                            let command = require(`.${path}/${name}/${files}`)
                            commandPrefix.set(command.name, command)
                            if (command.aliases && command.aliases.length >= 1) {
                                for (i in command.aliases) {
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

function loadCommandsSlash(path) {
    try {

        fs.readdir(path, (error, subFolderPath) => {
            for (const name of subFolderPath){
                fs.readdir(`${path}/${[name]}`, (error, files) => {
                    files.forEach((files) => {
                        if (files.endsWith(".js")) {
                            let command = require(`.${path}/${name}/${files}`)
                            commands.push(command.data.toJSON())
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

loadCommandsSlash("./commands/slash")
loadCommandsPrefix("./commands/prefix")

async function loadSlash(CLIENT_ID){

    try {
        console.log(`Começando a carregar ${commands.length} Slash Commands.`);

        const data = await rest.put(Routes.applicationCommands(CLIENT_ID),{ body: commands });

        console.log(`Recarreguei ${data.length} Slash Commands.`);
    } catch (error) {

        console.log(error);
    }
}

module.exports = {loadSlash, commandSlash, commandPrefix}
