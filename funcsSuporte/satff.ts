import { EmbedBuilder, GuildMember, StringSelectMenuInteraction } from "discord.js";
import { configData } from "../utils/loader";
import { verifyAdvertenciaEntry } from "./verifys";
import moment from "moment";
import { msgDelete } from "./messages";

export async function notifyMember(interaction: StringSelectMenuInteraction, reason: string) {

    const time = new Date();
    const dt = new Date().setHours(time.getHours()-3);

    let eR = new EmbedBuilder()
    .setTitle("Notificação")
    .setThumbnail(interaction.guild!.iconURL())
    .setColor(0x57f287)

    for (const m of interaction.message.embeds[0].description!.split("\n")){

        let member = await interaction.guild!.members.fetch(m.split(" ")[m.split(" ").length-1].replace(/[<@>]/g, ""));
        const author = interaction.member;

        try {
            
            eR.setDescription(`
Olá tudo bem? Você recebeu uma notificação pelo\n
motivo: ${reason}\n
Lembre-se, notificação não possui peso, você \
não sofreu advertência ou algo que gere seu \
banimento. As notificações existem apenas para \
te deixar mais por dentro do assunto.
Ou seja, relaxe`)
            await member.send({
                embeds: [eR]
            });

            eR.setDescription(" ")
            
            eR.setFields(
                {name: "Membro Notificado", value: `${member}`, inline: false},
                {name: "Notificado por por", value: `${author}`,inline: false},
                {name: "Motivo", value: `${reason}`, inline: false},
                {name:"Data", value: `${(moment(new Date(dt))).format("DD/MM/YYYY HH:mm")}`, inline: false}
            );
            const channel: any = await interaction.guild!.channels.fetch(configData["channels"]["modlog"]);
            await channel.send({
                embeds: [eR]
            });
        } catch (err) {
            eR.setDescription(" ")

            eR.setFields(
                {name: "Membro Notificado", value: `${member}`, inline: false},
                {name: "Notificado por por", value: `${author}`,inline: false},
                {name: "Motivo", value: `${reason}`, inline: false},
                {name:"Data", value: `${(moment(new Date(dt))).format("DD/MM/YYYY HH:mm")}`, inline: false}
            );
            const channel: any = await interaction.guild!.channels.fetch(configData["channels"]["modlog"]);
            await channel.send({
                content: `${member}`,
                embeds: [eR]
            });

        };
    };
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