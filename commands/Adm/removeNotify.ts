import { 
    ChatInputCommandInteraction,
    InteractionType,
    Message, 
    SlashCommandBuilder
    } from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import { rmvNotify } from "../../db/moderation";

export = {
    data: new SlashCommandBuilder()
    .setName("removenotify")
    .setDescription("Remove uma notificação de um membro")
    .setDMPermission(false),
    name: "removenotify",
    aliases: ["rntf", "rmvnotify"],
    roles: [
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["staff"]["astaroth"]
    ],
    description: "Remove uma advertencia de um membro",
    async execute(msg: Message | ChatInputCommandInteraction) {

        if (!msg.guild) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return await msg.reply({content: "Sem permissão", ephemeral: true})

        let valor = "";
        if (msg.type != InteractionType.ApplicationCommand){
            if (!msg.content.split(" ")[1]?.match(/[0-9]/)) return await msg.reply({content: "Id da notificação necessario"})
            valor = msg.content.split(" ")[1]
        } else {
            valor = msg.options.getString("id")!
        }

        if (await rmvNotify(valor)){

            await msg.reply({content: "Notificação removida", ephemeral: true})

        } else {

            await msg.reply({content: "Não encontrei essa notificação", ephemeral: true})

        }

    },
}