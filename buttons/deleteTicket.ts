import { createTranscript, ExportReturnType } from "discord-html-transcripts";
import { ButtonInteraction, EmbedBuilder } from "discord.js";
import { configData } from "..";

export async function execute(interaction: ButtonInteraction) {

    if (!interaction.guild) return

    let e = new EmbedBuilder()

    let member = await interaction.guild.members.fetch(
        interaction.message.embeds[0].footer!.text
    )
    
    const attachment = await createTranscript(interaction.channel!, {
        limit: -1,
        returnType: ExportReturnType.Attachment,
        filename: 'transcript.html',
        saveImages: false,
        footerText: "Exported {number} message{s}",
        poweredBy: false
    });

    let channelTicket: any = interaction.channel
    let cs: any;

    if (channelTicket.parentId == configData["categories"]["ticket_chats"]){

        cs = await interaction.guild.channels.fetch(configData["logs"]["log_transcript_chats"])

        await cs.send({content:`Ticket de ${member.displayName}`, files: [attachment]})

        e.addFields({name:"INFO", value:`Ticket de: ${member}\nAção: Deletado`, inline:false})
        e.addFields({name:"Tipo", value:"Problemas em Chats"})
        e.setFooter({text:`author: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
        e.setColor(0xE74C3C)

        await cs.send({embeds: [e]})

        cs = await interaction.guild.channels.fetch(configData["logs"]["log_create_chats"])

        await cs.send({embeds: [e]})

    }

    else if (channelTicket.parentId == configData["categories"]["ticket_calls"]){

        cs = await interaction.guild.channels.fetch(configData["logs"]["log_transcript_calls"])

        await cs.send({content:`Ticket de ${member.displayName}`, files: [attachment]}) 

        e.addFields({name:"INFO", value:"Ticket de: {member.mention}\nAção: Deletado", inline:false})
        e.addFields({name:"Tipo", value:"Problemas em Calls"})
        e.setFooter({text:`author: ${interaction.user.username}`, iconURL:interaction.user.displayAvatarURL()})
        e.setColor(0xE74C3C)

        cs = await interaction.guild.channels.fetch(configData["logs"]["log_create_calls"])

        await cs.send({embeds: [e]})
    
    }

    else if (channelTicket.parentId == configData["categories"]["ticket_privado"]){

        cs = await interaction.guild.channels.fetch(configData["logs"]["log_transcript_privado"])
        
        await cs.send({content:`Ticket de ${member.displayName}`, files: [attachment]})

        e.addFields({name:"INFO", value:"Ticket de: {member.mention}\nAção: Deletado", inline:false})
        e.addFields({name:"Tipo", value:"Problemas em Privado"})
        e.setFooter({text:`author: ${interaction.user.username}`, iconURL:interaction.user.displayAvatarURL()})
        e.setColor(0xE74C3C)

        await cs.send({embeds: [e]})

        cs = await interaction.guild.channels.fetch(configData["logs"]["log_create_privado"])

        await cs.send({embeds: [e]})

    }
        

    else if (channelTicket.parentId == configData["categories"]["ticket_outros"]){
        cs = await interaction.guild.channels.fetch(configData["logs"]["log_transcript_outros"])
        
        await cs.send({content:`Ticket de ${member.displayName}`, files: [attachment]})

        e.addFields({name:"INFO", value:"Ticket de: {member.mention}\nAção: Deletado", inline:false})
        e.addFields({name:"Tipo", value:"Problemas em Outros"})
        e.setFooter({text:`author: ${interaction.user.username}`, iconURL:interaction.user.displayAvatarURL()})
        e.setColor(0xE74C3C)

        await cs.send({embeds: [e]})

        cs = await interaction.guild.channels.fetch(configData["logs"]["log_create_outros"])

        await cs.send({embeds: [e]})
    
    }

    await interaction.channel!.delete()

}