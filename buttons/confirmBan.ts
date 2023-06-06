import { ButtonInteraction, EmbedBuilder } from "discord.js"
import { verifyRoles } from "../funcsSuporte/verifys"
import { client } from "../utils/loader"
import { configData } from "../utils/loader"
import moment from "moment"
import { RegsAtivos } from "../db/moderation"
import { msgDelete } from "../funcsSuporte/messages"

const roles: Array<any> = [
    configData["roles"]["staff"]["asmodeus"],
    configData["roles"]["staff"]["astaroth"]
]

export async function execute(interaction: ButtonInteraction) {

    const time = new Date()
    const dt = new Date().setHours(time.getHours()-3)

    let eR = new EmbedBuilder()
    .setTitle("Banimento")
    .setThumbnail(interaction.guild!.iconURL())
    .setColor(0xed4245)

    if (!verifyRoles(interaction, roles)) return await interaction.reply({content: "Sem permissão"})

    for (const m of interaction.message.embeds[0].description!.split("\n")){

        let user = await client.users.fetch(m.split(" ")[m.split(" ").length-1].replace(/[<@>]/g, ""))
        const author = await interaction.guild!.members.fetch(interaction.message.embeds[0].footer!.text)
        const aprovador = interaction.member
        const reason = interaction.message.embeds[0].fields[0].value

        try {

            try {
                eR.setFields(
                    {name: "Banido por", value: `${author.user.username}`,inline: false},
                    {name: "Aprovador por", value: `${aprovador!.user.username}`, inline: false},
                    {name: "Motivo", value: `${reason}`, inline: false},
                    {name:"Data", value: `${(moment(new Date(dt))).format("DD/MM/YYYY HH:mm")}`, inline: false}
                )
                await user.send({embeds: [eR]})
            } catch (err) {
            }

            eR.setFields(
                {name: "Membro Banido", value: `${user.username}`, inline: false},
                {name: "Banido por", value: `${author}`,inline: false},
                {name: "Aprovador por", value: `${aprovador}`, inline: false},
                {name: "Motivo", value: `${reason}`, inline: false},
                {name:"Data", value: `${(moment(new Date(dt))).format("DD/MM/YYYY HH:mm")}`, inline: false}
            )
            await interaction.guild!.bans.create(
               user.id,
                {
                    reason: reason,
                    deleteMessageSeconds: 604800
                });
            const channel: any = await interaction.guild!.channels.fetch(configData["channels"]["modlog"])
            await channel.send({
                embeds: [eR]
            })
        } catch (err) {
            let msg = await interaction.channel!.send({content: `Não conseguir banir o membro ${user.username}`});
            msgDelete(msg)
        };
    }

    msgDelete(interaction.message)
    RegsAtivos(-1)
    
}