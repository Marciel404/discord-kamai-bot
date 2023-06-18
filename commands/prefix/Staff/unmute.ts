import { Message } from "discord.js";
import { configData } from "../../..";
import { verifyRolesPermissions } from "../../../funcsSuporte/verifys";

export = {
    name: "unmute",
    aliases: ["desmutar"],
    description: "Desmuta um membro mutado",
    roles: [
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["staff"]["astaroth"],
        configData["roles"]["staff"]["ormenus"],
        configData["roles"]["staff"]["acacus"]
    ],
    async execute(msg: Message){

        if (!msg.guild) return

        if (!verifyRolesPermissions(msg.member!, this.roles)) return

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