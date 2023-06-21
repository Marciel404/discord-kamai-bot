import { Message } from "discord.js";
import { notifyList } from "../../db/moderation";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import { configData } from "../..";

export = {
    name: "listnotify",
    aliases: [],
    description: "Envia a lista de advertencias de um membro",
    roles: [
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute(msg: Message) {

        const msgArgs = msg.content.split(" ")
        if (!msg.guild) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return
        if (!msgArgs[1]) return await msg.reply({content: "Id da advertencia necessario"})

        if(await notifyList(msgArgs[1].replace(/[<@>]/g,""))) {

            await msg.reply({
                embeds: [{description: `${await notifyList(msgArgs[1].replace(/[<@>]/g,""))}`}]
            })

        } else {

            await msg.reply({content:"Esse membro não possue advertencias"})

        }
    }
}
