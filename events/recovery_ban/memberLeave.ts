import { GuildMember, PartialGuildMember, TextChannel } from "discord.js";
import { client } from "../../utils";
import { configData } from "../..";

client.on("guildMemberRemove", async (member: GuildMember | PartialGuildMember)  =>{

    if (member.guild.id == configData["guildRecoveryBan"]){
        try{
            await member.guild.channels.cache.find(channel => channel.type === 0 && channel.name === member.id)?.delete()
            let channel: any = member.guild.channels.cache.find(channel => channel.type === 0 && channel.name.includes("log"))
            await channel.send({content: `👈 ${member.user.username}(${member.id}) saiu do server`})
        } catch (err) {
            console.log(err)
        }
    }
})