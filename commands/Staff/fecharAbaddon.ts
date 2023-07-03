import { ChatInputCommandInteraction, Colors, Message, SlashCommandBuilder } from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";

export = {
    data: new SlashCommandBuilder()
    .setName("close")
    .setDescription("Fecha a sala do abaddon")
    .setDMPermission(false),
    name: "close",
    aliases: ["fechar"],
    description: "Fecha a sala do abaddon",
    roles: [
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute (msg: Message | ChatInputCommandInteraction){

        if (!msg.guild) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return

        try {

            let channel: any = await msg.guild!.channels!.fetch(configData.channels.abaddon_voice)

            if (!channel.permissionsFor(msg.guild!.roles.everyone).has("Connect")){
                return await msg.reply({content: "Os portões de abaddon já estão fechados", ephemeral: true})
            }

            await msg.channel!.send({embeds:[{
                thumbnail:{url:"https://i.imgur.com/dFlhEmM.png"},
                description:`Luz Obscura
                Que Clareia a escuridão
                E da alma mais pura
                Paira em mim a Solidão
                
                Nos meus lábios, tocam o nada
                Em Muitos morbidos a satisfação
                E a luxúria destes saciada
                Prevalece o vazio em meu profano coração
                
                Aprendi o ódio com o amor
                A loucura inválida
                Filho da noite eu sou
                Em minha face a figura pálida
                
                Negro Interior
                Frestas de luz
                Minha inferioridade Superior
                Que as trevas me conduz`,
                title: "Daqui por diante eu cuido",
                color: Colors.Red
            }]})

            await channel!.permissionOverwrites.edit(msg.guild!.id,{Connect:false})

        } catch (error) {
            console.log(error)
        }
    }
}