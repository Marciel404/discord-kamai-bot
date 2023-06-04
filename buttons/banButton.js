const { MessageCollector, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js")
const { verifyRoles } = require("../funcsSuporte/verifyRoles")
const { EmbedBuilder } = require("@discordjs/builders")
const client = require("../utils/loader")
const configData = require(`../utils/config${process.env.bot}`)

const motivos = [
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Flood/spam.',
        "value": '1',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Divulgação inadequada.',
        "value": '2',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Off topic/mensagem fora de tópico.',
        "value": '3',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Menção desnecessária de membros e cargos.',
        "value": '4',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Provocação e brigas.',
        "value": '5',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Poluição sonora.',
        "value": '6',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Atrapalhar o andamento do Karaokê.',
        "value": '7',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Denúncias falsas.',
        "value": '8',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Linguagem discriminatória.',
        "value": '9',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Exposição de membros/ Assédio.',
        "value": '10',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Preconceito, discriminação, difamação e/ou desrespeito.',
        "value": '11',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Planejar ou exercer raids no servidor.',
        "value": '12',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'NSFW/ (+18).',
        "value": '13',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Estimular ou praticar atividades ilegais ou que cause banimento de membros.',
        "value": '14',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Evasão de punição.',
        "value": '15',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Conteúdos graficamente chocantes.',
        "value": '16',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Quebra do ToS do Discord.',
        "value": '17',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Selfbot.',
        "value": '18',
    },
    {
        "emoji": ":BAN:903237786465894430",
        "label": 'Scam.',
        "value": '19',
    },

]

module.exports = {
    roles: [
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute( interaction ) {

        if (!verifyRoles(interaction, this.roles)) return await interaction.reply({content: "Sem permissão", ephemeral: true})

        const selecMenu = new StringSelectMenuBuilder()
        .setCustomId("motivos")
        .setMinValues(1)
        .setPlaceholder("Motivo do banimento")
        
        for (const i of motivos) {
            selecMenu.addOptions(
                new StringSelectMenuOptionBuilder()
                .setLabel(i["label"])
                .setEmoji(i["emoji"])
                .setValue(i["value"])
            )
        }

        const row = new ActionRowBuilder()
        .addComponents(selecMenu)

        await interaction.reply({content: "Envie os ids", ephemeral: true})
        const collectorFilter = (user) => {
            return user.id === interaction.user.id;
        };
        const collector = new MessageCollector(interaction.channel,collectorFilter, { time: 10000 });
        collector.on("collect", async (message) => {

            if (message.author.id === interaction.user.id){

                collector.stop()

                let desc = ""
                const embed = new EmbedBuilder()
                .setTitle("Banimento")
                .setFooter({text: interaction.user.id})

                const client = await interaction.guild.members.fetch(interaction.client.user.id)

                for (const i of message.content.split("\n")){

                    let member = await interaction.guild.members.fetch(i.replace(/[<@>]/g, ""))

                    if (member.roles.highest.position >= client.roles.highest.position){
                        let msg = await interaction.channel.send({content: `Não consego banir o membro ${member}`});
                        setTimeout(async () =>{
                            await msg.delete()
                        }, 5000)
                    } else {
                        desc += `${member}\n`
                    }
                }
                embed.setDescription(desc)

                await interaction.editReply(
                    {
                        content: "Qual motivo?",
                        embeds: [embed],
                        components:[row]
                    }
                )

                await message.delete()
                
            }
        })
    }
}