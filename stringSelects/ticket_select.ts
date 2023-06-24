import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CategoryChannel, ChannelType, EmbedBuilder, GuildTextChannelType, OverwriteType, PermissionFlagsBits, Role, StringSelectMenuInteraction, TextChannel } from "discord.js";
import { row } from "../funcsSuporte/components";
import { configData } from "..";
import moment from "moment";

export async function execute(interaction: StringSelectMenuInteraction) {

    await interaction.deferReply({ephemeral: true})

    await interaction.message.edit({components: [row(interaction.component)!]})

    await interaction.followUp({content:'Criando ticket', ephemeral: true})

    let ticket = `ticket-${interaction.user.id}`
    const time = new Date()
    const dt = new Date().setHours(time.getHours()-3)

    const c = interaction.values[0]

    for(const i of await interaction.guild!.channels.fetch()){
        if (i[1]!.parentId == c.split("-")[1] && i[1]!.name == ticket){
            return await interaction.followUp(
                {
                    content:'Ticket já existente, encerre o ultimo para criar outro',
                    ephemeral: true
                }
            )
        }
    }

    const guild = interaction.guild!
    const member = interaction.user
    const acacus = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["acacus"])
    const ormenus = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["ormenus"])
    const astaroth = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["astaroth"])
    const asmodeus = await interaction.guild!.roles.fetch(configData["roles"]["staff"]["acacus"])

    let channel = await interaction.guild!.channels.create(
        {
            type: ChannelType.GuildText,
            name: ticket,
            permissionOverwrites: [

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
            ],
            parent: c.split("-")[1]
        }
    )

    await interaction.followUp(
        {
            content:'Ticket criado com sucesso',
            components:[new ActionRowBuilder<any>()
                .addComponents(
                new ButtonBuilder()
                    .setLabel('Atalho para o ticket')
                    .setURL(`https://discordapp.com/channels/${interaction.guild!.id}/${channel.id}`)
                    .setStyle(5),
                )],
            ephemeral:true
        }
    )

    const e = new EmbedBuilder(
    )
    e.setTitle(`Ticket de ${member.username}`)
    e.setDescription(`Aberto ${moment(dt).format("HH:mm DD/MM/YYYY")}`)
    e.setFooter({text: member.id})

    let mention = ""

    let ee = new EmbedBuilder()

    switch (c.split("-")[1]){
        case configData["categories"]["ticket_chats"]:

            mention = `${ormenus!}`

            ee.addFields({name:"INFO",value:`Ticket de: ${member}\nAção: Criado`,inline: false})
            ee.addFields({name:"Tipo",value:"Problemas em Chats"})
            ee.setFooter({text:`author: ${interaction.user.username}`,iconURL:interaction.user.displayAvatarURL()})
            ee.setColor(0x2ECC71)
            
            interaction.guild!.channels.fetch(configData["logs"]["log_create_chats"])
            .then(async (channel: any) =>{
                await channel!.send({embeds: [ee]})
            })
            .catch(err=>console.log(err))

            break

        case configData["categories"]["ticket_calls"]:

            mention = `${acacus!}`
    
            ee.addFields({name:"INFO",value:`Ticket de: ${member}\nAção: Criado`,inline:false})
            ee.addFields({name:"Tipo", value:"Problemas em Calls"})
            ee.setFooter({text:`author: ${interaction.user.username}`, iconURL:interaction.user.displayAvatarURL()})
            ee.setColor(0x2ECC71)
    
            interaction.guild!.channels.fetch(configData["logs"]["log_create_calls"])
            .then(async (channel: any) =>{
                await channel!.send({embeds: [ee]})
            })
            .catch(err=>console.log(err))

            break
    
        case configData["categories"]["ticket_privado"]:

            mention = `${astaroth!}`
    
            ee.addFields({name:"INFO", value:`Ticket de: ${member}\nAção: Criado`, inline:false})
            ee.addFields({name:"Tipo", value:"Problemas em Privado"})
            ee.setFooter({text:`author: ${interaction.user.username}`, iconURL:interaction.user.displayAvatarURL()})
            ee.setColor(0x2ECC71)
    
            interaction.guild!.channels.fetch(configData["logs"]["log_create_privado"])
            .then(async (channel: any) =>{
                await channel!.send({embeds: [ee]})
            })
            .catch(err=>console.log(err))

            break
        
        case configData["categories"]["ticket_outros"]:

            mention = `${acacus!}`

            ee.addFields({name:"INFO", value:`Ticket de: ${member}\nAção: Criado`, inline:false})
            ee.addFields({name:"Tipo", value:"Problemas em Outros"})
            ee.setFooter({text:`author: ${interaction.user.username}`, iconURL:interaction.user.displayAvatarURL()})
            ee.setColor(0x2ECC71)
    
            interaction.guild!.channels.fetch(configData["logs"]["log_create_outros"])
            .then(async (channel: any) =>{
                await channel!.send({embeds: [ee]})
            })
            .catch(err=>console.log(err))
            break
    }
    
    await channel.send(
        {
            content:`${member} ${mention}`,
            embeds:[e],
            components: []
        }
    )
    
}