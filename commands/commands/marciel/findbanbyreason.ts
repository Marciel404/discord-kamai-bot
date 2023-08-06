import { AuditLogEvent, AuditLogOptionsType, Message } from "discord.js"
import { verifyUserId } from "../../funcsSuporte/verifys"
import moment from "moment"

export = {
    name: "fdb",
    aliases: [],
    description: "",
    async execute (msg: Message ) {

        if (!verifyUserId(msg.author,["485801281621852175"])) return
        let bans;
        if (msg.content.split(" ")[2])
        bans = (await msg.guild!.fetchAuditLogs({limit: 100,type: AuditLogEvent.MemberBanAdd})).entries.filter(au => au.reason == msg.content.split(" ")[1] && au.target?.username.indexOf(msg.content.split(" ")[2])! >= 0)
        else
        bans = (await msg.guild!.fetchAuditLogs({limit: 100,type: AuditLogEvent.MemberBanAdd})).entries.filter(au => au.reason == msg.content.split(" ")[1])
        let bs = ""
        for (const b of bans){
            bs += `${b[1].targetId}\n`
        }
        await msg.author.send({content:bs})
    }
}