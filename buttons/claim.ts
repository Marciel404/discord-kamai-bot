import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, EmbedBuilder, OverwriteType, PermissionFlagsBits } from "discord.js"
import { configData } from ".."

export async function execute(interaction: ButtonInteraction){

    const guild = interaction.guild!
    const member = await interaction.guild!.members.fetch(interaction.message.embeds[0].footer!.text)
    const acacus = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["acacus"])
    const ormenus = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["ormenus"])
    const astaroth = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["astaroth"])
    const asmodeus = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["acacus"])

    if (interaction.user.id == member.id){
        return await interaction.reply({content: "Sem permissão", ephemeral: true})
    }

    interaction.guild!.channels.fetch(interaction.channel!.id)
    .then(async (channel) => {
        
        await channel?.edit(
            {
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
                        id: interaction.user.id,
                        allow:[
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.AttachFiles
                        ],
                        type: OverwriteType.Member
                    },
                    {
                        id: guild!.id,
                        deny: [PermissionFlagsBits.ViewChannel],
                        type: OverwriteType.Role
                    },
                    {
                        id: acacus!.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel
                        ],
                        deny: [
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.AttachFiles
                        ],
                        type: OverwriteType.Role
                    },
                    {
                        id: ormenus!.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel
                        ],
                        deny: [
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.AttachFiles
                        ],
                        type: OverwriteType.Role
                    },
                    {
                        id: astaroth!.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel
                        ],
                        deny: [
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.AttachFiles
                        ],
                        type: OverwriteType.Role
                    },
                    {
                        id: asmodeus!.id,
                        allow: [
                            PermissionFlagsBits.ViewChannel
                        ],
                        deny: [
                            PermissionFlagsBits.SendMessages,
                            PermissionFlagsBits.AttachFiles
                        ],
                        type: OverwriteType.Role
                    }
                ]
            }
        )
    })
    .catch((error)=>{})

    await interaction.message!.edit(
        {
            components: [
                new ActionRowBuilder<any>()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId("closeTicket")
                    .setLabel("🔒 Fechar ticket")
                    .setStyle(1),
                )
            ]
        }
    )
}