import { GuildMember, PartialGuildMember } from "discord.js";
import { client } from "../../utils";
import { memberManegements } from "../../db/moderation";
import { configData } from "../..";

client.on("guildMemberUpdate", async (member: GuildMember | PartialGuildMember) => {
    
    if (member.guild.id != configData["guild"]) return;

    let auditInfo = (await member.guild.fetchAuditLogs({limit: 1, type: 25})).entries.first()!;

    try{

        if (auditInfo.changes[0].key === "$add"){

            memberManegements.findOneAndUpdate(
                {_id: member.id},
                {$addToSet:{ roles: Object.values(auditInfo.changes[0].new!)[0].id}},
                {upsert: true}

            );

        } else if (auditInfo.changes[0].key == "$remove") {

            memberManegements.findOneAndUpdate(
                {_id: member.id},
                { $pull:{roles:{$in: [Object.values(auditInfo.changes[0].new!)[0].id ]}}},
                { upsert: true }
            );

        };

    } catch (err){
        console.log(err);
    };
    
});