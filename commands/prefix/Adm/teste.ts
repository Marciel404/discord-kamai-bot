import { Message } from "discord.js"
import { configData } from "../../..";
import moment from "moment";

export = {
    name: "somartimes",
    aliases: ["anun_evento"],
    description: "Anuncia um evento",
    roles: [
        configData["roles"]["equipe_evento"],
        configData["roles"]["capitaes_evento"],
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute(msg: Message) {
        let msgArgs = msg.content.split(" ")
        console.log(msgArgs[1])
        await msg.reply({content: `${moment(new Date().setTime(parseInt(msgArgs[1])) - new Date().setTime(parseInt(msgArgs[2])))}`})
    },
}