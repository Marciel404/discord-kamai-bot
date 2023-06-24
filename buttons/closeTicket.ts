import { ButtonInteraction, EmbedBuilder, OverwriteType, PermissionFlagsBits } from "discord.js"
import { adcTicket, moddb } from "../db/moderation"
import { configData } from ".."

export async function execute(interaction: ButtonInteraction){

    adcTicket(1)

    const guild = interaction.guild!
    const member = await interaction.guild!.members.fetch(interaction.message.embeds[0].footer!.text)
    const acacus = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["acacus"])
    const ormenus = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["ormenus"])
    const astaroth = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["astaroth"])
    const asmodeus = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["acacus"])

    const e = new EmbedBuilder()
    e.setDescription(`🔒Ticket de ${member} fechado por ${interaction.user} \nClique no 🔓 para abrir`)
    e.setFooter({text: member.id})

    interaction.guild!.channels.fetch(interaction.channel!.id)
    .then(async (channel) => {
        
        await channel?.edit(
            {
                name: `closed-${await moddb.findOne({_id:"kamaiMod"})["tickets"]}`,
                permissionOverwrites:[

                    {
                        id: member.id,
                        deny:[
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.AttachFiles
                        ],
                        type: OverwriteType.Member
                    },
                    {
                        id: guild!.id,
                        deny:[PermissionFlagsBits.ViewChannel],
                        type: OverwriteType.Role
                    },
                    {
                        id: acacus!.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.AttachFiles
                        ],
                        type: OverwriteType.Role
                    },
                    {
                        id: ormenus!.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.AttachFiles
                        ],
                        type: OverwriteType.Role
                    },
                    {
                        id: astaroth!.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.AttachFiles
                        ],
                        type: OverwriteType.Role
                    },
                    {
                        id: asmodeus!.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.AttachFiles
                        ],
                        type: OverwriteType.Role
                    }
                ]
            }
        )

        const ee = new EmbedBuilder()

        switch (channel?.parentId){

            case configData["categories"]["ticket_chats"]:

                ee.addFields({name:"INFO", value:`Ticket de: ${member}\nAção: Fechado`, inline:false})
                ee.addFields({name:"Tipo", value:"Problemas em Chats"})
                ee.setFooter({text:`author: ${interaction.member}`, iconURL:interaction.user.displayAvatarURL()})
                ee.setColor(0xFEE75C)

                interaction.guild!.channels.fetch(configData["logs"]["log_create_chats"])
                .then(async (channel: any) =>{
                    await channel!.send({embeds: [ee]})
                })
                .catch(err=>console.log(err))

                break
            case configData["categories"]["ticket_calls"]:

                ee.addFields({name:"INFO", value:`Ticket de: ${member}\nAção: Fechado`, inline:false})
                ee.addFields({name:"Tipo", value:"Problemas em Calls"})
                ee.setFooter({text:`author: ${interaction.member}`, iconURL:interaction.user.displayAvatarURL()})
                ee.setColor(0xFEE75C)

                interaction.guild!.channels.fetch(configData["logs"]["log_create_calls"])
                .then(async (channel: any) =>{
                    await channel!.send({embeds: [ee]})
                })
                .catch(err=>console.log(err))

                break

            case configData["categories"]["ticket_privado"]:

                ee.addFields({name:"INFO", value:`Ticket de: ${member}\nAção: Fechado`, inline:false})
                ee.addFields({name:"Tipo", value:"Problemas em Privado"})
                ee.setFooter({text:`author: ${interaction.member}`, iconURL:interaction.user.displayAvatarURL()})
                ee.setColor(0xFEE75C)

                interaction.guild!.channels.fetch(configData["logs"]["log_create_privado"])
                .then(async (channel: any) =>{
                    await channel!.send({embeds: [ee]})
                })
                .catch(err=>console.log(err))

                break

            case configData["categories"]["ticket_outros"]:

                ee.addFields({name:"INFO", value:`Ticket de: ${member}\nAção: Fechado`, inline:false})
                ee.addFields({name:"Tipo", value:"Problemas em Outros"})
                ee.setFooter({text:`author: ${interaction.member}`, iconURL:interaction.user.displayAvatarURL()})
                ee.setColor(0xFEE75C)

                interaction.guild!.channels.fetch(configData["logs"]["log_create_outros"])
                .then(async (channel: any) =>{
                    await channel!.send({embeds: [ee]})
                })
                .catch(err=>console.log(err))

                break

        }
    })

    await interaction.message.delete()

    await interaction.channel!.send(
        {
            embeds:[e],
            components:[]
        }
    )

}