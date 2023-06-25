import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, EmbedBuilder, OverwriteType, PermissionFlagsBits } from "discord.js"
import { configData } from ".."
import { adcTicket, moddb } from "../db/moderation"


export async function execute(interaction: ButtonInteraction){

    adcTicket(1)
    const guild = interaction.guild!
    const member = await interaction.guild!.members.fetch(interaction.message.embeds[0].footer!.text)
    const acacus = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["acacus"])
    const ormenus = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["ormenus"])
    const astaroth = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["astaroth"])
    const asmodeus = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["acacus"])

    interaction.guild!.channels.fetch(interaction.channel!.id)
    .then(async (channel) => {
        await channel?.edit(
            {
                name: `ticket-${member.id}`,
                permissionOverwrites:[

                    {
                        id: member.id,
                        allow:[
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

        let cs: any;

        switch (channel?.parentId){

            case configData["categories"]["ticket_chats"]:

                ee.addFields({name: "INFO", value: `Ticket de: ${member}\nAção: Aberto`, inline: false})
                ee.addFields({name: "Tipo", value: "Problemas em Chats"})
                ee.setFooter({text:`author: ${interaction.user.username}`, iconURL:interaction.user.displayAvatarURL()})
                ee.setColor(0xE67E22)

                cs = await interaction.guild!.channels.fetch(configData["logs"]["log_create_chats"])

                await cs.send({embeds: [ee]})

                break

            case configData["categories"]["ticket_calls"]:

                ee.addFields({name:"INFO", value: `Ticket de: ${member}\nAção: Aberto`, inline: false})
                ee.addFields({name:"Tipo", value:"Problemas em Call"})
                ee.setFooter({text:`author: ${interaction.user.username}`, iconURL:interaction.user.displayAvatarURL()})
                ee.setColor(0xE67E22)

                cs = await interaction.guild!.channels.fetch(configData["logs"]["log_create_calls"])

                await cs.send({embeds: [ee]})

                break

            case configData["categories"]["ticket_privado"]:

                ee.addFields({name:"INFO", value: `Ticket de: ${member}\nAção: Aberto`, inline: false})
                ee.addFields({name:"Tipo", value:"Problemas em Privado"})
                ee.setFooter({text:`author: ${interaction.user.username}`, iconURL:interaction.user.displayAvatarURL()})
                ee.setColor(0xE67E22)

                cs = await interaction.guild!.channels.fetch(configData["logs"]["log_create_privado"])

                await cs.send({embeds: [ee]})

                break

            case configData["categories"]["ticket_outros"]:

                ee.addFields({name:"INFO", value: `Ticket de: ${member}\nAção: Aberto`, inline: false})
                ee.addFields({name:"Tipo", value:"Problemas em Outros"})
                ee.setFooter({text:`author: ${interaction.user.username}`, iconURL:interaction.user.displayAvatarURL()})
                ee.setColor(0xE67E22)

                cs = await interaction.guild!.channels.fetch(configData["logs"]["log_create_outros"])

                await cs.send({embeds: [ee]})

                break

        }
    })
    .catch((error) => {})

    await interaction.message.delete()

    const e = new EmbedBuilder()
    e.setTitle(`Ticket de ${member.displayName} aberto 🔓`)
    e.setFooter({text: `${member.id}`})

    await interaction.channel!.send(
        {
            embeds: [e],
            components: [
                new ActionRowBuilder<any>()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId("closeTicket")
                    .setLabel("🔒 Fechar ticket")
                    .setStyle(1),
                    new ButtonBuilder()
                    .setLabel("Claim")
                    .setCustomId("claim")
                    .setStyle(1)
                )
            ]
        }
    )
}