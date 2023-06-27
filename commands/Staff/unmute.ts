import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js";
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";

export = {
    data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Desmuta um membro mutado")
    .addUserOption((option) => 
        option
        .setName("member")
        .setDescription("Um membro a ser desmutado")
        .setRequired(true)
    )
    .addStringOption((option) =>
        option
        .setName("motivo")
        .setDescription("Motivo de desmutar o membro")
    ),
    name: "unmute",
    aliases: ["desmutar"],
    description: "Desmuta um membro mutado",
    roles: [
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["staff"]["astaroth"],
        configData["roles"]["staff"]["ormenus"],
        configData["roles"]["staff"]["acacus"]
    ],
    async execute(msg: Message | ChatInputCommandInteraction){

        if (!msg.guild) return;
        if (!verifyRolesPermissions(msg.member!, this.roles)) return
        let reason;
        let Id;
        if (msg.type != InteractionType.ApplicationCommand){
            const msgArgs = msg.content.split(" ")
            if (!msg.content.split(" ")[1]?.replace(/[<@>]/g, "")?.match(/[0-9]/)) return await msg.reply({content: "Mencione o membro"})
            reason = (msgArgs[3]) ? msg.content.substring(msgArgs.slice(0, 2).join(" ").length + 1) : "Motivo não informado";
            Id = msg.content.split(" ")[1].replace(/[<@>]/g, "")
        } else {
            Id = msg.options.getUser("member")!.id;
            reason = (msg.options.getString("motivo")) ? msg.options.getString("motivo")! : "Motivo não informado";
        }

        const member = await msg.guild!.members.fetch(Id) ;

        if (member.communicationDisabledUntil){

            await member.timeout(null, reason);

            await msg.reply({content: `${member} desmutado com sucesso`, ephemeral: true});

        } else {

            await msg.reply( {content: `${member} não está mutado`, ephemeral: true});

        };
        
    }
}