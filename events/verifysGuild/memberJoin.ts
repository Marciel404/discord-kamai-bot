import { GuildMember } from "discord.js";
import { verifyAdvertenciaEntry } from "../../funcsSuporte/verifys";
import { client } from "../../utils";
import { configData } from "../..";
import logger from "../../logger";

//Verifys member join
client.on("guildMemberAdd", async (member: GuildMember) => {
    try {
        if(member.guild.id === configData["guild"]){
            await verifyAdvertenciaEntry(member)
        }
    } catch (err) {
        logger.error(err)
    }
})