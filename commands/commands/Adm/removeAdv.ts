import { Message } from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import { rmvAdvertencia } from "../../db/moderation";

export = {
    name: "removeadv",
    aliases: ["radv", "rmvadv"],
    roles: [
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["staff"]["astaroth"]
    ],
    description: "Remove uma advertencia de um membro",
    async execute(msg: Message) {

        if (!msg.guild) return

        const msgArgs = msg.content.split(" ")

        if (!verifyRolesPermissions(msg.member!, this.roles)) return

        if (!msgArgs[1]?.match(/[0-9]/)) return await msg.reply({content: "Id da advertencia necessario"})

        if (await rmvAdvertencia(Number(msgArgs[1]))){

            await msg.reply({content: "Advertenia removida"})

        } else {

            await msg.reply({content: "Não encontrei essa advertencia"})

        }

    },
}