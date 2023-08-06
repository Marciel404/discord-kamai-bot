import { ChatInputCommandInteraction, GuildMember, InteractionType, Message, SlashCommandBuilder, User } from "discord.js";
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import { inc_money, memberManegements } from "../../db/moderation";

export = {
    data: new SlashCommandBuilder()
    .setName("transferir")
    .setDescription("Transfere uma quantidade de KamaiCoins")
    .setDMPermission(false)
    .addUserOption((option) => 
        option
            .setName("membro")
            .setDescription("Escolha um membro para transferir")
            .setRequired(true)
    )
    .addIntegerOption((option) => 
        option
            .setName("quantia")
            .setDescription("Quantia a transferir")
            .setRequired(true)
    ),
    name: "transferir",
    aliases: ["transfer", "pay"],
    description: "Transfere uma quantidade de KamaiCoins",
    async execute(msg: Message | ChatInputCommandInteraction) {

        if (!msg.guild) return;
        if (!verifyRolesPermissions(msg.member!,[configData.roles.staff.staff1, configData.roles.staff.staff2]) && msg.channel?.id != configData["channels"]["commands"]) return

        let memberT: any;
        let qnt;
        if (msg.type != InteractionType.ApplicationCommand){
            if ( !msg.content.split(" ")[1] ) return await msg.reply({content: "argumento membro necessario"})
            if ( !msg.content.split(" ")[2]?.match(/[0-9]/) ) return await msg.reply({content: "argumento quantia necessario"})
            memberT = (await msg.guild.members.fetch(msg.content.split(" ")[1].replace(/[<@>]/g, ""))).user
            qnt = parseInt(msg.content.split(" ")[2])
        } else {
            memberT = (await msg.guild.members.fetch(msg.options.getUser("membro")!.id)).user
            qnt = msg.options.getInteger("quantia")!
        }
        
        if (memberT.id == msg.member?.user.id){
            return await msg.reply({content: "Qual sentido de tentar transferir para si mesmo?", ephemeral: true}) 
        } else if (memberT.bot){
            return await msg.reply({content: "Qual sentido de tentar transferir para um bot?", ephemeral: true}) 
        }

        const balUser = await memberManegements.findOne({_id: msg.member?.user.id})

        if ( qnt > balUser.economy?.money ){
            return await msg.reply({content: "Você não tem essa quantidade para transferir", ephemeral: true})
        } else if (qnt <= 0){
            return await msg.reply({content: "A quantia deve ser maior que 0", ephemeral: true})
        }

        await inc_money(msg.member?.user!, - qnt)

        await inc_money(memberT, qnt)

        await msg.reply({content: `Você transferiu ${qnt} kamaicoins para ${memberT}`})

    }
};