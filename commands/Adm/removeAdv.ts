import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import { rmvAdvertencia } from "../../db/moderation";

export = {
    data: new SlashCommandBuilder()
    .setName("removeadv")
    .setDescription("Remove uma advertencia de um membro")
    .setDMPermission(false),
    name: "removeadv",
    aliases: ["radv", "rmvadv"],
    roles: [
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["staff"]["astaroth"]
    ],
    description: "Remove uma advertencia de um membro",
    async execute (msg: Message | ChatInputCommandInteraction) {

        if (!msg.guild) return

        if (!verifyRolesPermissions(msg.member!, this.roles)) return

        let valor = "";
        if (msg.type != InteractionType.ApplicationCommand){
            if (!msg.content.split(" ")[1]?.match(/[0-9]/)) return await msg.reply({content: "Id da notificação necessario"})
            valor = msg.content.split(" ")[1]
        } else {
            valor = msg.options.getString("id")!
        }

        if (await rmvAdvertencia(valor, msg.guild)){
            await msg.reply({content: "Advertenia removida"})
        } else {
            await msg.reply({content: "Não encontrei essa advertencia"})
        }

    }
}