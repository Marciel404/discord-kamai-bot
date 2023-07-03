import { ChatInputCommandInteraction, Colors, InteractionType, Message, SlashCommandBuilder, TextChannel } from "discord.js";
import { client } from "../../utils";
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";

export = {
    data: new SlashCommandBuilder()
    .setName("edit")
    .setDescription("Edita uma mensagem enviada pelo bot")
    .addChannelOption((option) =>
        option
        .setName("channel")
        .setDescription("Canal que está a mensagem")
        .setRequired(true)
    )
    .addStringOption((option) => 
        option
        .setName("message_id")
        .setDescription("Id da mensagem a modificar")
        .setRequired(true)
    )
    .addStringOption((option) => 
        option
        .setName("content")
        .setDescription("Conteudo para modificar")
        .setRequired(true)
    )
    .setDMPermission(false),
    name: "edit",
    aliases: [],
    description: "edita o conteudo de uma mensage enviada pelo bot",
    roles: [
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"],
        configData["roles"]["capitaes_karaoke"],
        configData["roles"]["capitaes_poem"],
        configData["roles"]["capitaes_arte"],
        configData["roles"]["capitaes_evento"]
    ],
    async execute (msg: Message | ChatInputCommandInteraction) {

        if (!msg.guild) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return

        if (msg.type != InteractionType.ApplicationCommand) {

            var msgArgs = msg.content.split(" ");

            if(!(/^<[@][!&]?[0-9]+>$/.test(msgArgs[1]) || /[0-9]+/.test(msgArgs[1]))) return await msg.channel.send({content: msg.author.toString(), embeds:[{description:"Você precisa mencionar o canal primeiro",color: Colors.Red}]})

            if(!(/^<[@][!&]?[0-9]+>$/.test(msgArgs[2]) || /[0-9]+/.test(msgArgs[2]))) return await msg.channel.send({content: msg.author.toString(), embeds:[{description:"Como irei modificar o manuscrito se não me enviou o id da mensagem?",color: Colors.Red}]})
                    
            if(!msgArgs[3]) return await msg.channel.send({content: msg.author.toString(), embeds:[{description:"Como irei modificar o manuscrito se você não me enviou o conteudo?", color: Colors.Red}]})
            
            let msgedit = msg.content.substring(msgArgs.slice(0, 3).join(" ").length + 1);
            
            if(msgedit.length > 2000) return await msg.channel.send(msg.author.toString()+" Mensagem invalida. Verifique seu conteudo")
            
            const canal = client.channels.cache.find((channel: any) =>channel.id === msgArgs[1])
            
            if(!canal) return await msg.channel.send({content: msg.author.toString(), embeds:[{ description:"Não foi possivel achar o canal", color: Colors.Red}]})
            
            try {

                const editMessage = await canal.messages.fetch({message:msgArgs[2]})

                if(!editMessage) return
                
                else try {

                    await editMessage.edit(msgedit)

                    await msg.channel.send(msg.author.toString()+" Mensagem edita com sucesso em " + editMessage.channel.name)

                } catch (error) {
                    await msg.channel.send({content: msg.author.toString(), embeds:[{description:"Não tenho permissão para editar essa mensagem",color: Colors.Red}]})
                }

            } catch (error) {
                await msg.channel.send({content: msg.author.toString(), embeds:[{description:"Você precisa me dar uma mensagem valida",color: Colors.Red}]})
            }
        } else {

            try {

                const canal: TextChannel = msg.options.getChannel("channel")!

                const editMessage = await canal.messages.fetch({message: msg.options.getString("message_id")!}) 

                if(!editMessage) return await msg.reply({content: "Mensagem não encontrada", ephemeral: true})
                
                else try {
                    
                    await editMessage.edit({content: msg.options.getString("content")!})

                    await msg.reply({content: `${msg.user} Mensagem editada com sucesso em ${editMessage.channel.name}`, ephemeral:true})

                } catch (error) {
                    await msg.reply({content: msg.user.toString(), embeds:[{description:"Não tenho permissão para editar essa mensagem",color: Colors.Red}], ephemeral:true})
                }

            } catch (error) {
                await msg.reply({content: msg.user.toString(), embeds:[{description:"Você precisa me dar uma mensagem valida",color: Colors.Red}], ephemeral:true})
            }
        }
    }
}