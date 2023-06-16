import { GuildMember } from "discord.js";
import { verifyAdvertenciaEntry } from "../funcsSuporte/verifys";
import { client } from "../utils";

//Verify warns member join
client.on("guildMemberAdd", async (member: GuildMember) => {
    await verifyAdvertenciaEntry(member)
})