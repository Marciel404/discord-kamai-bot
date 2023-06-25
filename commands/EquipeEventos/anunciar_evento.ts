import { ChatInputCommandInteraction, Colors, InteractionType, Message, SlashCommandBuilder } from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import embDb from "../../utils/embDb";

export = {
    data: new SlashCommandBuilder()
    .setName("anunciar_evento")
    .setDescription("Anuncia um evento"),
    name: "anunciar_evento",
    aliases: ["anun_evento"],
    description: "Anuncia um evento",
    roles: [
        configData["roles"]["equipe_evento"],
        configData["roles"]["capitaes_evento"],
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute(msg: Message | ChatInputCommandInteraction) {
        if (!msg.guild) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return

        let embListed = await embDb.EmbList()

        if (msg.type == InteractionType.ApplicationCommand){

            await msg.deferReply({ephemeral:true})

            if (!embListed) return await msg.followUp({ embeds: [{ description: "Nenhum embed registrado ainda", color: Colors.Red }], ephemeral: true })

            embListed.forEach(async (emb) => {
                await msg.followUp({content: `${emb}`})
            });
            
            await msg.followUp({content: "Envie o id do embed que deseja enviar", ephemeral: true})

            var filter = (m: Message) => m.author.id == msg.user.id
            var msgEmbs = await msg.channel?.awaitMessages({ filter, max: 1, time: 120000, errors: [`time`] })

            await msgEmbs?.first()?.delete()
            var recvdb = await embDb.getEmb(msgEmbs?.first()?.content)
            
            if (!recvdb) return await msg.followUp({content: `Id invalido`, ephemeral: true})

            msg.guild.channels!.fetch(configData["channels"]["anun_evento"])
            .then(async (channel: any) => {
                await channel!.send(
                    {
                        content: `${await msg.guild?.roles.fetch(configData["roles"]["eventos"])}`,
                        embeds: [recvdb["embed"]]
                    }
                )
            })

        } else {

            if (!embListed) return await msg.reply({ embeds: [{ description: "Nenhum embed registrado ainda", color: Colors.Red }]})

            embListed.forEach(async (emb) => {
                await msg.reply({content: `${emb}`})
            });
            
            await msg.reply({content: "Envie o id do embed que deseja enviar"})

            var filter = (m: Message) => m.author.id == msg.author.id
            var msgEmb = await msg.channel?.awaitMessages({ filter, max: 1, time: 120000, errors: [`time`] })

            await msgEmb?.first()?.delete()
            var recvd = await embDb.getEmb(msgEmb?.first()?.content)
            
            if (!recvd) return await msg.reply({content: `Id invalido`})

            msg.guild.channels!.fetch(configData["channels"]["anun_evento"])
            .then(async (channel: any) => {
                await channel!.send(
                    {
                        content: `${await msg.guild?.roles.fetch(configData["roles"]["eventos"])}`,
                        embeds: [recvd["embed"]]
                    }
                )
            })
        }
    },
}