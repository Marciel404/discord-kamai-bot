import { Colors, Message, TextChannel } from "discord.js";
import moment from "moment";
import { configData } from "../../..";

export = {
    name: "tempmute",
    aliases: ["mute", "mutar"],
    description: "Muta um membro por uma quantidade de tempo",
    async execute(msg: Message){

        const msgArgs = msg.content.split(" ")
        if (!msg.content.split(" ")[1].replace(/[<@>]/g, "")?.match(/[0-9]/)) return await msg.reply({content: "Mencione o membro"})
        if (!msgArgs[2]) return await msg.reply({content: "Diga o tempo de mute"})
        let reason = (msgArgs[3]) ? msg.content.substring(msgArgs.slice(0, 3).join(" ").length + 1) : "Motivo não informado";
        let time: any = "";
        if (
            msgArgs[2].replace(/[0-9]/g, "").toLowerCase() == "dias" ||
            msgArgs[2].replace(/[0-9]/g, "").toLowerCase() == "d"){
            time = "days"
        } else if (
            msgArgs[2].replace(/[0-9]/g, "").toLowerCase() == "minutos" ||
            msgArgs[2].replace(/[0-9]/g, "").toLowerCase() == "m"){
            time = "minutes"

        } else if (
            msgArgs[2].replace(/[0-9]/g, "").toLowerCase() == "horas" ||
            msgArgs[2].replace(/[0-9]/g, "").toLowerCase() == "h"){
            time = "hours"

        }
        let muteTime = moment(0).add(parseInt(msgArgs[2].replace(/[a-z]/g, "")), time).valueOf()

        if(!muteTime) return await msg.reply("Tempo invalido")
        const member = await msg.guild!.members.fetch(msg.content.split(" ")[1].replace(/[<@>]/g, ""))
        await member.timeout(muteTime, reason)

        await msg.reply({content: `${member} mutado com sucesso`})

        const canal: any = msg.guild!.channels.cache.get(configData.channels.modlog)

        await canal.send({embeds:[{
            description:`🤫 ${member} foi **mutado temporariamente** por ${msgArgs[2]}: ${reason}.`,
            color:Colors.Green,
        }]})

    }
}