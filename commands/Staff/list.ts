import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js";
import { warn_list } from "../../db/moderation";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import { configData } from "../..";

export = {
    data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Envia a lista de advertencias de um membro")
    .addUserOption((option) => 
        option
        .setName("member")
        .setDescription("Um membro para ver as advertencias")
        .setRequired(true)
    ),
    name: "list",
    aliases: [],
    description: "Envia a lista de advertencias de um membro",
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
        
        if(await warn_list(Id)) {

            await msg.reply({
                embeds: [{description: `${await warn_list(Id)}`}]
            })

        } else {
            
            await msg.reply({content:"Esse membro não possue advertencias"})
            
        }
    }
}
