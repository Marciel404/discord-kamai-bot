import { Message } from "discord.js";
import { configData } from "../../..";
import { verifyRoles } from "../../../funcsSuporte/verifys";

export = {
    name: "unmute",
    aliases: ["desmutar"],
    description: "Desmuta um membro mutado",
    roles: [
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["staff"]["astaroth"],
        configData["roles"]["staff"]["ormenus"],
    ],
    async execute(msg: Message){
        if (!verifyRoles(msg, this.roles)) return
        
        const msgArgs = msg.content.split(" ");
        if (!msg.content.split(" ")[1].replace(/[<@>]/g, "")?.match(/[0-9]/)) return await msg.reply({content: "Mencione o membro"});
        let reason = (msgArgs[2]) ? msg.content.substring(msgArgs.slice(0, 3).join(" ").length + 1) : "Motivo não informado";

        const member = await msg.guild!.members.fetch(msgArgs[1].replace(/[<@>]/g, ""))
        await member.timeout(null, reason)
        if (member.communicationDisabledUntil){
            await msg.reply({content: `${member} desmutado com sucesso`})
        } else {
            await msg.reply( {content: `${member} não está mutado`})
        }
        
    }
}