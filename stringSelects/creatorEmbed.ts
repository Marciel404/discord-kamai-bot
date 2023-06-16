import { ActionRowBuilder, Colors, EmbedBuilder, Message, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder, range } from "discord.js";
import embDb from "../utils/embDb";
import { row } from "../funcsSuporte/components";

let embedArray: any = {}

export async function execute(interaction: StringSelectMenuInteraction) {

    if (!embedArray[interaction.user.id]){
        embedArray[interaction.user.id] = new EmbedBuilder()
    }

    let dataEmbed = embedArray[interaction.user.id]

    await interaction.message.edit({components: [row(interaction.component)!]})

    await interaction.deferReply({ephemeral: true})

    switch (interaction.values[0]) {
        case "0":

            embedArray[interaction.user.id] = false

            await interaction.followUp("Embed Cancelada, podes criar uma nova")

            break
        case "1":

            let authorName;
            let UrlI;
            let Url;

            await interaction.followUp({content: "Envie o nome do autor ou cancelar", ephemeral: true})

            var filter = (m: any) => m.author.id === interaction.user.id;

            var msgAuthorName: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })
            if (msgAuthorName.first().content.toLowerCase() == "cancelar") return await interaction.followUp({content: "Author cancelado", ephemeral: true})
            await msgAuthorName.first().delete()

            authorName = msgAuthorName.first().content

            await interaction.followUp({content: "Envie o url da imagem do author ou ''pular''", ephemeral: true})

            var msgUrlI: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })
            if (msgUrlI.first().content.toLowerCase() == "pular") {
                await interaction.followUp({content: "Imagem do author pulado", ephemeral: true})
                UrlI = undefined
            }

            await msgUrlI.first().delete()

            if (!["pular"].includes(msgUrlI.first().content.toLowerCase())) {
                try{
                    await interaction.followUp({ embeds: [{author:{name: authorName, icon_url: msgUrlI.first().content}}], ephemeral: true})
                    UrlI = msgUrlI.first().content
                } catch (err) {
                    await interaction.followUp({content:"**Url invalida**", ephemeral: true})
                    UrlI = undefined
                }
            }

            await interaction.followUp({content: "Envie o url de incorporação do author ou ''pular''", ephemeral: true})

            var msgUrl: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })
            if (msgUrl.first().content.toLowerCase() == "pular") {
                await interaction.followUp({content: "Link de incorporação do author pulado", ephemeral: true})
                Url = undefined
            }

            await msgUrl.first().delete()

            if (!["pular"].includes(msgUrl.first().content.toLowerCase())) {
                try{
                    await interaction.followUp({ embeds: [{author:{name: authorName, icon_url: UrlI ,url: msgUrl.first().content}}], ephemeral: true})
                    Url = msgUrl.first().content
                } catch (err) {
                    await interaction.followUp({content:"**Url invalida**", ephemeral: true})
                    Url = undefined
                }
            }

            embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
            .setAuthor({name: authorName, iconURL: UrlI, url: Url})

            await interaction.followUp({ embeds: [embedArray[interaction.user.id]], ephemeral: true });

            break;
        case "2":

            await interaction.followUp({content: "Envie o titulo ou ''cancelar''", ephemeral: true})

            var filter = (m: any) => m.author.id === interaction.user.id;

            var title: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })
            if (title.first().content.toLowerCase() == "cancelar") return await interaction.followUp({content: "Titulo cancelado", ephemeral: true})
            await title.first().delete()

            embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
            .setTitle(title.first().content)

            await interaction.followUp({ embeds: [embedArray[interaction.user.id]], ephemeral: true });

            break
        case "3":
            let e: any = new EmbedBuilder(dataEmbed)
            if (e.fields && e.fields.length == 25) return (interaction.followUp({content:"Limite máximo de campos adicionado", ephemeral: true}))
            await interaction.followUp({content:"Você quer inserir um campo vazio? (sim ou não)", ephemeral: true})
            
            var filter = (m: any) => m.author.id === interaction.user.id
            var msgConfirm: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: ["Time"] })
            
            if (msgConfirm.first().content.toLowerCase() == "sim" || msgConfirm.first().content.toLowerCase() == "s") {
                await msgConfirm.first().delete();
                
                embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                .addFields({name:`\u200B`, value:`\u200B`, inline:true})
                
                await interaction.followUp({ embeds: [embedArray[interaction.user.id]] , ephemeral: true})
                
            } else {
                await msgConfirm.first().delete();

                await interaction.followUp({content: "Insira o nome do campo", ephemeral: true})

                var filter = (m: any) => m.author.id == interaction.user.id
                var msgNom: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: ["Time"] })
        
                await msgNom.first().delete()
                
                await interaction.followUp({content: "Insira o valor do campo",ephemeral: true})
                
                var msgVal: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: ["Time"] })
                        
                await msgVal.first().delete()
                        
                await interaction.followUp({content: "Deseja o campo alinhado? (sim ou não)", ephemeral: true})
                
                var filter = (m: any) => m.author.id === interaction.user.id
                
                var msgConfirm: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: ["Time"] })
                
                if (msgConfirm.first().content.toLowerCase() == "sim" || msgConfirm.first().content.toLowerCase() == "s") {
                    await msgConfirm.first().delete();
                    
                    await interaction.followUp({ 
                        embeds: [
                            embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                            .addFields({name:msgNom.first().content, value:msgVal.first().content})
                        ], 
                        ephemeral: true }
                    )
                } else {
                    await msgConfirm.first().delete();
                    
                    await interaction.followUp({
                        embeds: [
                            embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                            .addFields({name: msgNom.first().content, value:msgVal.first().content, inline:false})
                        ],
                        ephemeral: true }
                    )
                }
            }
            break
        case "4":

            let em: any = new EmbedBuilder(dataEmbed)

            await interaction.followUp({content:"Qual a posição do campo que você quer remover?(1,2,3...)", ephemeral: true})
                        
            var filter = (m: any) => /[0-9]+/.test(m.content) && parseInt(m.content) <= 25 && m.author.id === interaction.user.id
                
            var msgCmprem: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })

            if (em.fields && em.fields.length < parseInt(msgCmprem.first().content)) return await interaction.followUp({content:"Nenhum campo nesse valor", ephemeral:true})
            
            await msgCmprem.first().delete()
            
            await interaction.followUp({ 
                embeds: [
                    embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                    .spliceFields(parseInt(msgCmprem.first().content) - 1, 1)
                    ],
                ephemeral: true
            })
            break
        case "5":
            var msgLast = await interaction.followUp({
                content:` Selecione a cor
1- Verde
2- Vermelho
3- Roxo
4- Azul
5- Blurple
6- Sua cor em hex`,
                ephemeral: true
            })

            var filter = (m: any) => m.author.id == interaction.user.id && /[0-9]+/.test(m.content);
            var msgCol: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })
            msgCol.first().delete()
            switch (parseInt(msgCol.first().content)) {
                case 1:
                    interaction.followUp({ 
                        embeds: [
                            embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                            .setColor(Colors.Green)
                        ],
                        ephemeral: true
                    });
                    break;
                case 2:
                    msgLast.delete();
                    interaction.followUp({ 
                        embeds: [
                            embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                        .setColor(Colors.Red)
                        ],
                        ephemeral: true
                    });
                    break;
                case 3:
                    msgLast.delete();
                    interaction.followUp({ 
                        embeds: [
                            embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                            .setColor(Colors.Purple)
                        ],
                        ephemeral: true 
                    });
                    break;
                case 4:
                    msgLast.delete();
                    interaction.followUp({
                        embeds: [
                            embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                            .setColor(Colors.Blue)
                        ],
                        ephemeral: true
                    });
                    break;
                case 5:
                    msgLast.delete();
                    interaction.followUp({
                        embeds: [
                            embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                            .setColor(Colors.Blurple)
                        ],
                        ephemeral: true
                    });
                    break;
                case 6:
                    await interaction.followUp(`${interaction.user} envie a cor em hex agora`)
                    filter = (m: any) => m.author.id == interaction.user.id
                    var msgColHex: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })
                        
                    try{
                        await interaction.followUp({
                            embeds:[
                                embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                                .setColor(msgColHex.first().content)
                            ],
                            ephemeral: true
                        })
                    }catch{
                        await interaction.followUp(`${interaction.user} Cor invalida`)
                        await interaction.followUp({
                            embeds:[
                                embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                                .setColor(null)
                            ],
                            ephemeral: true
                        })
                    }finally{
                        await msgColHex.first().delete();
                    }
                break;
            }
                    
            break;
        case "6":

            await interaction.followUp('Digite a descrição do embed')

            var filter = (m: any) => m.author.id === interaction.user.id;

            var msgDesc: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })

            if(!msgDesc.first().content) return await interaction.followUp({content: "Descrição necessaria", ephemeral: true})

            embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
            .setDescription(msgDesc.first().content)

            await msgDesc.first().delete()
        
            await interaction.followUp({ embeds: [embedArray[interaction.user.id]], ephemeral: true });
            
            break
        case "7":

            if (!dataEmbed.description) return await interaction.followUp({content: "A descrição está vazia", ephemeral: true })
            await interaction.followUp({embeds: [dataEmbed.description], ephemeral: true })

            break
        case "8":
            await interaction.followUp(`Envie agora a url da imagem da thumbnali`)
                    
            var filter = (m: any) => m.author.id === interaction.user.id;
            
            var msgThumb: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })
            
            await msgThumb.first().delete();
            
            try {
                await interaction.followUp({
                    embeds: [
                        embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                        .setThumbnail(msgThumb.first().content)
                    ],
                    ephemeral: true
                });
            } catch (err) {
                embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                .setThumbnail(null)
                await interaction.followUp({content: `Imagem invalida`, ephemeral: true})
            }

            break
        case "9":
            await interaction.followUp(`Envie agora a url da imagem`)
                    
            var filter = (m: any) => m.author.id === interaction.user.id;
            
            var msgThumb: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })
            
            await msgThumb.first().delete();
            
            try {
                await interaction.followUp({
                    embeds: [
                        embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                        .setImage(msgThumb.first().content)
                    ],
                    ephemeral: true
                });
            } catch (err) {
                embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                .setImage(null)
                await interaction.followUp({content: `Imagem invalida`, ephemeral: true})
            }
            break
        case "10":
            await interaction.followUp({content: `Digite o texto do rodapé`, ephemeral: true})
                    
            var filter = (m: any) => m.author.id === interaction.user.id;
            var msgFtx: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })
            
            await msgFtx.first().delete()
            
            await interaction.followUp({content: `Deseja inserir uma imagem no rodapé? (sim ou não)`, ephemeral:true})
            
            var filter = (m: any) => m.author.id === interaction.user.id
            
            var msgConfirm: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })

            if (msgConfirm.first().content.toLowerCase() == "sim" || msgConfirm.first().content.toLowerCase() == "s"){
                await msgConfirm.first().delete();
                await interaction.followUp({content: `Envie o link da imagem`, ephemeral: true})
                var filter = (m: any) => m.author.id === interaction.user.id;
                
                var msgFoturl: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })
                
                await msgFoturl.first().delete()
                try {
                    await interaction.followUp({
                        embeds: [
                            embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                            .setFooter({text: msgFtx.first().content, iconURL: msgFoturl.first().content})
                        ],
                        ephemeral: true
                    });
                } catch ( err ) {
                    console.log(err)
                    await interaction.followUp({
                        content: "**Url Invalida**",
                        embeds: [
                            embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                            .setFooter({text:msgFtx.first().content, iconURL: undefined})
                        ],
                        ephemeral: true
                    })
                }
            } else {
                await msgConfirm.first().delete();
                await interaction.followUp({
                    embeds: [
                        embedArray[interaction.user.id] = new EmbedBuilder(dataEmbed)
                        .setFooter({text:msgFtx.first().content})
                        ],
                        ephemeral: true
                    })
            }
            break
        case "11":

            if (dataEmbed.length == 0) return await interaction.followUp({content: "A embed não pode estar vazia", ephemeral: true})
            await interaction.followUp({content: `Envie o nome do seu embed`, ephemeral: true})
            var filter = (m: any) => m.author.id === interaction.user.id
            
            var msgSavem: any = await interaction.channel!.awaitMessages({ filter, max: 1, time: 120000, errors: [`Time`] })
            
            await msgSavem.first().delete()
            await new embDb().saveEmb(dataEmbed, msgSavem.first().content, interaction.user.username)

            await interaction.followUp({ content:`Seu embed foi salvo`,  embeds: [embedArray[interaction.user.id]], ephemeral: true });

            embedArray[interaction.user.id] = false
            break
        case "12":
            await interaction.followUp({content:"Pronto", ephemeral: true})
            let selecMenu = new StringSelectMenuBuilder()
            .setCustomId("OpçõesEmbed")
            .setMinValues(1)
            .setPlaceholder("O que ira fazer")

            for (const i of range(5)) {
                selecMenu.addOptions(
                    new StringSelectMenuOptionBuilder()
                    .setLabel(`${i+1}`)
                    .setValue(`${i+1}`)
                )
            }
            const row = new ActionRowBuilder<any>()
            .addComponents(selecMenu)
            await interaction.message.edit({embeds: [
                {
                    title: "O que deseja fazer com o embed", 
                    color: Colors.Blurple, 
                    description: `
1- Enviar um embed
2- Criar um embed
3- Deletar embed
4- Traz um embed que não esta dentro ainda no bot, mas esta em um canal
5- Editar uma mensagem que contem um embed`,
                    footer: {text: `${interaction.user.id}`}
                }
            ], components: [row]})
            break
    }
}