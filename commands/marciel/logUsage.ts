import { Message } from "discord.js";
import { verifyUserId } from "../../funcsSuporte/verifys";

export = {
    name: "lusage",
    description: "Envia as logs de uso de comandos",
    aliases: [],
    async execute(msg: Message){

        if (!verifyUserId(msg.author,["485801281621852175"])) return

        await msg.reply({files: ["loggerUsage.txt"]})
        
    }
}