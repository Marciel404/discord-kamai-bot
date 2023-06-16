import { Message } from "discord.js"
import { configData } from "../../..";
import { verifyRoles } from "../../../funcsSuporte/verifys";
import { rmvNotify } from "../../../db/moderation";

export = {
    name: "removenotify",
    aliases: ["rntf", "rmvnotify"],
    roles: [
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["staff"]["astaroth"]
    ],
    description: "Remove uma advertencia de um membro",
    async execute(msg: Message) {
        const msgArgs = msg.content.split(" ")
        if (!verifyRoles(msg.member!, this.roles)) return
        if (!msgArgs[1]?.match(/[0-9]/)) return await msg.reply({content: "Id da notificação necessario"})
        if (await rmvNotify(Number(msgArgs[1]))){
            await msg.reply({content: "Notificação removida"})
        } else {
            await msg.reply({content: "Não encontrei essa notificação"})
        }
        
    },
}