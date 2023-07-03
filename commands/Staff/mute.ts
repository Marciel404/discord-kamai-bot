import { ChatInputCommandInteraction, Colors, InteractionType, Message, SlashCommandBuilder } from "discord.js";
import moment from "moment";
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";

export = {
    data: new SlashCommandBuilder()
    .setName("tempmute")
    .setDescription("Muta um membro por uma quantidade de tempo")
    .addUserOption((option) => 
        option
        .setName("member")
        .setDescription("Um membro para mutar")
        .setRequired(true)
    )
    .addStringOption((option) => 
        option
        .setName("tempo")
        .setDescription("Quantidade de tempo para mutar")
        .setRequired(true)
    )
    .addStringOption((option) =>
        option
        .setName("motivo")
        .setDescription("Motivo de mutar o membro")
    )
    .setDMPermission(false),
    name: "tempmute",
    aliases: ["mute", "mutar"],
    description: "Muta um membro por uma quantidade de tempo",
    roles: [
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["staff"]["astaroth"],
        configData["roles"]["staff"]["ormenus"],
        configData["roles"]["staff"]["acacus"]
    ],
    async execute(msg: Message | ChatInputCommandInteraction){

        if (!msg.guild) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return
        let Id: string;
        let reason;
        let timeV;
        if (msg.type != InteractionType.ApplicationCommand){
            const msgArgs = msg.content.split(" ")
            if (!msg.content.split(" ")[1]?.replace(/[<@>]/g, "")?.match(/[0-9]/)) return await msg.reply({content: "Mencione o membro"})
            if (!msgArgs[2]) return await msg.reply({content: "Diga o tempo de mute"})
            reason = (msgArgs[3]) ? msg.content.substring(msgArgs.slice(0, 3).join(" ").length + 1) : "Motivo não informado";
            Id = msg.content.split(" ")[1].replace(/[<@>]/g, "")
            timeV = msg.content.split(" ")[2].toLowerCase()
        } else {
            Id = msg.options.getUser("member")!.id;
            timeV = msg.options.getString("tempo")?.toLowerCase();
            reason = (msg.options.getString("motivo")) ? msg.options.getString("motivo")! : "Motivo não informado";
        }
        
        let time: any = "";
        
        if (
            timeV!.replace(/[0-9]/g, "").toLowerCase() == "dias" || 
            timeV!.replace(/[0-9]/g, "").toLowerCase() == "d" ){
            time = "days"
        } else if (
            timeV!.replace(/[0-9]/g, "").toLowerCase() == "minutos" || 
            timeV!.replace(/[0-9]/g, "").toLowerCase() == "m"){
            time = "minutes"
        } else if (
            timeV!.replace(/[0-9]/g, "").toLowerCase() == "horas" || 
            timeV!.replace(/[0-9]/g, "").toLowerCase() == "h"){
            time = "hours"
        }
        
        let muteTime = moment(0).add(parseInt(timeV!.replace(/[a-zA-Z]/g,"")), time).valueOf()

        if(!muteTime) return await msg.reply({content: "Tempo invalido", ephemeral: true})
        
        const member = await msg.guild!.members.fetch(Id)
        
        await member.timeout(muteTime, reason)

        await msg.reply({content: `${member} mutado com sucesso`, ephemeral: true})

        const canal: any = msg.guild!.channels.cache.get(configData.channels.modlog)

        await canal.send({embeds:[{
            description:`🤫 ${member} foi **mutado temporariamente** por ${msg.member}\nMotivo: ${reason}.`,
            color:Colors.Green,
        }]})

    }
}