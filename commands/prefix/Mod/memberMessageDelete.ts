import { Message } from "discord.js";
import { configData } from "../../..";
import { verifyRoles } from "../../../funcsSuporte/verifys";

export = {
    name: "membermessagedelete",
    aliases: ["mmdel", "mmd"],
    description: "Limpa as mensagens de um membro de todos os canais do server em um periodo de 14 dias",
    roles: [
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["staff"]["astaroth"],
        configData["roles"]["staff"]["ormenus"],
    ],
    async execute(msg: Message){

        const msgArgs = msg.content.split(" ")
        if (!msg.guild) return
        if (msgArgs.length == 0 || !msgArgs[1]?.match(/[0-9]/)) return await msg.reply({content: "Mencione o membro"})
        if (!verifyRoles(msg.member!, this.roles)) return
        let channels = await msg.guild.channels.fetch()
        for (const c of channels!){
            try{
                if (c[1]!.type === 0){
                    let messages = (await c[1]!.messages.fetch()).filter(message => message.author.id === msgArgs[1].replace(/[<@>]/g, ""))
                    await c[1]?.bulkDelete(messages, true)
                }
            } catch (err) {
            }
        }
    }
}