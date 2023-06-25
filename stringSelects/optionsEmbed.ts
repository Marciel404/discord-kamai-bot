import {
    ActionRowBuilder,
    ChannelType,
    Colors,
    Message,
    StringSelectMenuBuilder,
    StringSelectMenuInteraction,
    StringSelectMenuOptionBuilder,
    range
    } from "discord.js";
import embDb from "../utils/embDb";
import { row } from "../funcsSuporte/components";

export async function execute(interaction: StringSelectMenuInteraction){
    if (interaction.user.id != interaction.message.embeds![0].footer!.text) return await interaction.reply({content: "Está interação não pertesse a você", ephemeral: true})

    let embListed = await embDb.EmbList()

    await interaction.message.edit({components: [row(interaction.component)!]})

    switch (interaction.values[0]){

        case "1":

            await interaction.deferReply({ephemeral: true})

            if (!embListed) return await interaction.followUp({ embeds: [{ description: "Nenhum embed registrado ainda", color: Colors.Red }], ephemeral: true })
                    
            embListed.forEach(async (emb) => {
                await interaction.followUp({content: `${emb}`})
            });
            
            await interaction.followUp({content: "Envie o id do embed que deseja enviar", ephemeral: true})
            var filter = (m: Message) => m.author.id == interaction.user.id
            var msgEmbs = await interaction.channel?.awaitMessages({ filter, max: 1, time: 120000, errors: [`time`] })
            await msgEmbs?.first()?.delete()
            var recvdb = await embDb.getEmb(msgEmbs?.first()?.content)
            
            if (!recvdb) return await interaction.followUp({content: `Id invalido`, ephemeral: true})

            await interaction.followUp({ embeds: [recvdb.embed], ephemeral: true })

            await interaction.followUp({content: `Envie id do canal que deseja enviar a mensagem`, ephemeral: true})
            filter = (m: Message) => m.author.id === interaction.user.id
            var msgChanCol: any = await interaction.channel?.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })
            
            await msgChanCol.first().delete()
            var channel: any = interaction.client.channels.cache.get(msgChanCol?.first()?.content)
            
            if (!channel) return await interaction.followUp({content: "Id de canal invalido", ephemeral: true})
            
            await interaction.followUp({content: "Embed enviado em " + channel?.name, ephemeral: true})
            
            await channel.send({ embeds: [recvdb.embed] })

            break;

        case "2":
            await interaction.reply({content:"Pronto", ephemeral:true})
            let selecMenu = new StringSelectMenuBuilder()
            .setCustomId("creatorEmbed")
            .setMinValues(1)
            .setPlaceholder("O que ira fazer")

            for (const i of range(13)) {
                selecMenu.addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setLabel(`${i}`)
                    .setValue(`${i}`)
                )
            }
            const row = new ActionRowBuilder<any>()
            .addComponents(selecMenu)

            await interaction.message.edit({embeds: [{
                title: "Selecione a opção para o embed:", description: `
1- Adicionar author
2- Adicionar titulo
3- Adicionar campo
4- Remover campo
5- Adicionar cor
6- Adicionar descrição
7- Mostra o que estiver dentro da descrição
8- Adicionar thumbnail
9- Adicionar Imagem
10- Adicionar rodapé
11- Salvar
12- voltar
0- Cancelar`, 
                color: Colors.Blurple ,
                image: { 
                    url: "https://cdn.discordapp.com/attachments/861722847437389824/1118999694065020978/embedexample2.png"
                },
                footer: {text: interaction.user.id}
            }], components: [row]})
            break

        case "3":
            await interaction.deferReply({ephemeral: true})
            if (embListed!.length == 0) return await interaction.followUp({ embeds: [{ description: "Nenhum embed registrado ainda", color: Colors.Red }] , ephemeral: true})

            embListed!.forEach(async (emb) => {
                await interaction.followUp({content: `${emb}`, ephemeral: true})
            });

            await interaction.followUp({content: "Envie o id do embed que deseja deletar", ephemeral: true})
            filter = m => /[0-9]/g.test(m.content) && m.author.id === interaction.user.id;
            var msgDelCol = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: ['time'] })
            
            if (!await embDb.delEmb(msgDelCol.first()!.content)) {
                await interaction.followUp({content: `**ID ERRADO**`, ephemeral: true})
            } else {
                await interaction.followUp({content: `**Embed deletado**`, ephemeral: true})
            }
            
            break;

        case "4":
            await interaction.deferReply({ephemeral: true})
            await interaction.followUp({content: "Envie o id do **CANAL** que esta o embed que deseja copiar", ephemeral: true})
            var filter = (m: Message) => m.author.id == interaction.user.id && /[0-9]/g.test(m.content)
            var channelEmb = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`time`] })

            await channelEmb!.first()!.delete()
            let channelEmbc = interaction.guild!.channels.cache.get(channelEmb!.first()!.content)

            if(!channelEmbc || channelEmbc.type != ChannelType.GuildText) return await interaction.followUp({content: "Id de canal invalido", ephemeral: true})

            await interaction.followUp({content: "Envie o id da **MENSAGEM** que esta o embed que deseja copiar", ephemeral: true})
            var filter = (m: Message) => m.author.id == interaction.user.id && /[0-9]/g.test(m.content)
            var msgEmb = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`time`] })

            await msgEmb!.first()!.delete()
            let msgEmbM = await channelEmbc.messages.fetch({message: msgEmb!.first()!.content})

            if (!msgEmbM!.embeds[0]) return await interaction.followUp({content:"Nenhum embed encontrado nessa mensagem, no canal " + channelEmbc.name, ephemeral: true})
            
            var emb = msgEmbM?.embeds[0]
            
            await interaction.followUp({content:  "**Embed encontrado!** ", embeds:[emb], ephemeral: true } )
            await interaction.followUp({content:  "**Digite o nome que deseja salvar o embed** ", ephemeral:true } )
            
            var filter = (m: Message) => m.author.id == interaction.user.id
            var nameEmb = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`time`] })

            embDb.saveEmb(emb, nameEmb.first()!.content, interaction.user.username)

            await interaction.followUp({content: 'Embed salvo com sucesso!', ephemeral: true})

            break;

        case "5":

            await interaction.deferReply({ephemeral: true})

            if (!embListed) return await interaction.followUp({ embeds: [{ description: "Nenhum embed registrado ainda", color: Colors.Red }], ephemeral: true })

            embListed.forEach(async (emb) => {
                await interaction.followUp({content: `${emb}`})
            });
            
            await interaction.followUp({content: "Envie o id do embed que deseja usar", ephemeral: true})
            var filter = (m: Message) => m.author.id == interaction.user.id && /[0-9]/.test(m.content)
            var msgEmbs2: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`time`] })
            
            await msgEmbs2.first().delete()
            var recvdb = await embDb.getEmb(msgEmbs2.first().content)
        
            if (!recvdb) return await interaction.followUp({content: `Id invalido`, ephemeral: true})

            await interaction.followUp({ embeds: [recvdb.embed], ephemeral: true })

            await interaction.followUp({content: `Envie id do **CANAL** que contem o embed que deseja editar`, ephemeral: true})
            filter = m => /[0-9]+/.test(m.content) && m.author.id === interaction.user.id
            var msgChan: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })
            
            await msgChan.first().delete()
            var channel: any = await interaction.guild!.channels.fetch(msgChan.first().content)
            
            if (!channel) return await interaction.followUp({content: "Id de canal invalido", ephemeral: true})

            await interaction.followUp({content: `Envie id da **MENSAGEM** que contem o embed que deseja editar`, ephemeral: true})
            var msgMsgCol: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })
            await msgMsgCol.first().delete()
            try {
                var msgToEdit = await channel.messages.fetch(msgMsgCol.first().content)

                await msgToEdit.edit({embeds:[recvdb.embed]})

                await interaction.followUp({content: `Mensagem editada`, ephemeral:true})
            } catch (error) {
                await interaction.followUp({content: 'Id da mensagem invalido', ephemeral: true})
            }
            break;
    }
}