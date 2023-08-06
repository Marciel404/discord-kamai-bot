import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js";
import { notifyList } from "../../db/moderation";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import { configData } from "../..";

export = {
    data: new SlashCommandBuilder()
    .setName("listnotify")
    .setDescription("Envia a lista de notificações de um membro")
    .addUserOption((option) => 
        option
        .setName("member")
        .setDescription("Um membro para ver as notificações")
        .setRequired(true)
    )
    .setDMPermission(false),
    name: "listnotify",
    aliases: [],
    description: "Envia a lista de notificações de um membro",
    roles: [
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute(msg: Message | ChatInputCommandInteraction) {

        if (!msg.guild) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return
        
        let Id: string;
        if (msg.type != InteractionType.ApplicationCommand){
            const msgArgs = msg.content.split(" ")
            if (!msgArgs[1]) return await msg.reply({content: "Id do membro necessario"})
            Id = msgArgs[1].replace(/[<@>]/g, "")
        } else {
            Id = msg.options.getUser("member")!.id
        }

        if(await notifyList(Id)) {

            await msg.reply({
                embeds: [{description: `${await notifyList(Id)}`}],
                ephemeral: true
            })

        } else {

            await msg.reply({content:"Esse membro não possue notificações", ephemeral: true})

        }
    }
}
