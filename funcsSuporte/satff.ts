import { EmbedBuilder, GuildMember, Interaction } from "discord.js";
import { configData } from "../utils/loader";
import { verifyAdvertenciaEntry } from "./verifys";

export async function notifyMember(interaction: Interaction) {
    
}

export async function functionAdvRoles(member: GuildMember, author: GuildMember, aprovador: any, dt: any){

    const roles: Array<string> = [configData["roles"]["adv1"], configData["roles"]["adv2"], configData["roles"]["adv3"]]
    let v = await verifyAdvertenciaEntry(member)
    if (!v){
        return await member.roles.add(roles[0])
    }
    for (const r of Object.values(member.roles)[0]["_roles"]){
        let eR = new EmbedBuilder()
        .setThumbnail(member.guild!.iconURL())
        .setColor(0xed4245);
        switch (r){
            case roles[2]:
                eR.setTitle("Banimento");
                try {
                    eR.setFields(
                        {name: "Banido por", value: `${author.user.username}`,inline: false},
                        {name: "Aprovador por", value: `${aprovador!.user.username}`, inline: false},
                        {name: "Motivo", value: `Acumulo de advertencia`, inline: false},
                        {name:"Data", value: `${dt}`, inline: false}
                    )
                    await member.send({embeds: [eR]})
                } catch (err) {
                }

                eR.setFields(
                    {name: "Membro Banido", value: `${member.user.username}`, inline: false},
                    {name: "Banido por", value: `${author}`,inline: false},
                    {name: "Aprovador por", value: `${aprovador}`, inline: false},
                    {name: "Motivo", value: `Acumulo de advertencia`, inline: false},
                    {name:"Data", value: `${dt}`, inline: false}
                )
                await member.guild!.bans.create(
                member.id,
                    {
                        reason: "Acumulo de Advertencia",
                        deleteMessageSeconds: 604800
                    });
                const channel: any = await member.guild!.channels.fetch(configData["channels"]["modlog"])
                await channel.send({
                    embeds: [eR]
                })
                return "adv3"
            case roles[1]:
                return await member.roles.add([roles[0], roles[1], roles[2]])
            case roles[0]:
                return await member.roles.add([roles[0], roles[1]])
            default:
                return await member.roles.add(roles[0])
        }
    };
}