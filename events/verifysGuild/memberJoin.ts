import { GuildMember } from "discord.js";
import { verifyAdvertenciaEntry } from "../../funcsSuporte/verifys";
import { client } from "../../utils";
import { configData } from "../..";

//Verifys member join
client.on("guildMemberAdd", async (member: GuildMember) => {
    if( member.guild.id === configData["guild"]){
        await verifyAdvertenciaEntry(member)
    }
})