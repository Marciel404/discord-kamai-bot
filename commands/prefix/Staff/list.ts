import { Message } from "discord.js";
import { warn_list } from "../../../db/moderation";
import { verifyRolesPermissions } from "../../../funcsSuporte/verifys";
import { configData } from "../../..";

export = {
    name: "list",
    aliases: [],
    description: "Envia a lista de advertencias de um membro",
    roles: [
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute(msg: Message) {

        if (!msg.guild) return

        const msgArgs = msg.content.split(" ")

        if (!verifyRolesPermissions(msg.member!, this.roles)) return

        if (!msgArgs[1]) return await msg.reply({content: "Id da advertencia necessario"})

        if(await warn_list(msgArgs[1].replace(/[<@>]/g,""))) {

            await msg.reply({
                embeds: [{description: `${await warn_list(msgArgs[1].replace(/[<@>]/g,""))}`}]
            })

        } else {
            
            await msg.reply({content:"Esse membro não possue advertencias"})
            
        }
    }
}
