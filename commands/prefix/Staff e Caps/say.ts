import { Message } from "discord.js"
import { configData } from "../../..";
import { verifyRoles } from "../../../funcsSuporte/verifys";

export = {
    name: "say",
    aliases: [],
    description: "Envia uma mensagem",
    roles: [
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"],
        configData["roles"]["capitaes_karaoke"],
        configData["roles"]["capitaes_poem"],
        configData["roles"]["capitaes_arte"],
        configData["roles"]["capitaes_evento"]
    ],
    async execute(msg: Message) {

        if (!verifyRoles(msg, this.roles)) return

        if (!msg.content.toLowerCase().split(" ")[1]) return await msg.reply({content: "Argumento canal necessario"})
        if (!msg.content.toLowerCase().split(" ")[2]) return await msg.reply({content: "Argumento canal mensagem"})

        const channelId = msg.content.toLowerCase().split(" ")[1].replace(/[<#>]/gi,"")
        let args = ""

        for (const p of msg.content.split(" ")) {
            if (p != msg.content.split(" ")[0] && p != msg.content.split(" ")[1]) {
                args += `${p} `
            }
        }

        const channel: any = await msg.guild!.channels.fetch(channelId)

        await channel.send({
            content: args,
        });
    },
}