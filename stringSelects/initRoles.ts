import {
    ActionRowBuilder,
    EmbedBuilder,
    Message,
    StringSelectMenuBuilder,
    StringSelectMenuInteraction,
    StringSelectMenuOptionBuilder
    } from "discord.js";
import { msgDelete } from "../funcsSuporte/messages";

const cargos1 = [
    {
        "label": "Eligos",
        "value": "eligos",
    },
    {
        "label": "Vagantes",
        "value": "vagantes"
    },
    {
        "label": "Naberios",
        "value": "naberios"
    },
    {
        "label": "Gremorys",
        "value": "gremorys"
    }
];

export const cargos2 = {
    "eligos": [
        {
            "label": "Capitão Eligo",
            "value": "cap karaoke"
        },
        {
            "label": "Eligo",
            "value": "karaoke",
        }
    ],
    "vagantes": [
        {
            "label": "Capitão Ose",
            "value": "cap poem",
        },
        {
            "label": "Vagante",
            "value": "poem"
        }

    ],
    "naberios": [
        {
            "label": "Capitão Naberios",
            "value": "cap arte",
        },
        {
            "label": "Naberio",
            "value": "arte"
        },
    ],
    "gremorys": [
        {
            "label": "Capitão Gremory",
            "value": "cap evento",
        },
        {
            "label": "Gremory",
            "value": "evento"
        },
    ]
};

export async function execute(interaction: StringSelectMenuInteraction){

    let cargos = new StringSelectMenuBuilder()
    .setCustomId("selectCargos")
    .setMinValues(1)
    .setPlaceholder("Qual equipe");

    for (const i of cargos1){
        cargos.addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel(i["label"])
            .setValue(i["value"])
        )
    };

    const row = new ActionRowBuilder<any>()
    .addComponents(cargos);

    if (interaction.values[0] === "adcRoles"){

        await interaction.update({content: "Envie os ids", components:[]});
        const collectorFilter = (m: Message) => m.author.id === interaction.user.id;
        const collector = interaction.channel!.createMessageCollector({ filter: collectorFilter, max: 1, time: 100000 });

        collector.on("collect", async (message: Message) => {

            let embed = new EmbedBuilder()
            .setTitle("Adicionar cargo")
            .setFooter({text: interaction.user.id});

            let desc: string = ""
    
            const client = await interaction.guild!.members.fetch(interaction.client.user.id);
    
            for (const i of message.content.split("\n")){
    
                try {
    
                    let member = await interaction.guild!.members.fetch(i.replace(/[<@>]/g, ""))
    
                    if (member.roles.highest.position >= client.roles.highest.position){
                        let msg = await interaction.channel!.send({content: `Não consego adicionar cargo a o membro ${member}`});
                        await msgDelete(msg,3000)
                    } else {
                        desc += `${member}\n`
                    }
    
                } catch {
    
                    let msg = await interaction.channel!.send({content: `${i.replace(/[<@>]/g, "")} não é um usuario ou não está no servidor`});
                    await msgDelete(msg,3000)
                    
                };
            }
            if (desc.length == 0) {
                await interaction.editReply({content: "Não consegui adicionar cargo a ninguem"});
                msgDelete(message,0)
                return
            };
            
            embed.setDescription(desc);

            msgDelete(message,0);

            await interaction.editReply(
                {
                    content: "Qual Cargo?",
                    embeds: [embed],
                    components: [row]
                }
            );
            
        });

    } else {

        await interaction.update({content: "Envie os ids", components:[]});
        const collectorFilter = (m: Message) => m.author.id === interaction.user.id;
        const collector = interaction.channel!.createMessageCollector({ filter: collectorFilter, max: 1, time: 100000 });

        collector.on("collect", async (message: Message) => {

            let embed = new EmbedBuilder()
            .setTitle("Remover cargo")
            .setFooter({text: interaction.user.id});
            let desc = ""
    
            const client = await interaction.guild!.members.fetch(interaction.client.user.id);
    
            for (const i of message.content.split("\n")){
    
                try {
    
                    let member = await interaction.guild!.members.fetch(i.replace(/[<@>]/g, ""));
    
                    if (member.roles.highest.position >= client.roles.highest.position){
                        let msg = await interaction.channel!.send({content: `Não consego adicionar cargo a o membro ${member}`});
                        msgDelete(msg,3000)
                    } else {
                        desc += `${member}\n`
                    };
    
                } catch {
    
                    let msg = await interaction.channel!.send({content: `${i.replace(/[<@>]/g, "")} não é um usuario ou não está no servidor`});
                    msgDelete(msg,3000)
                    
                };
            };
            if (desc.length == 0) {
                await interaction.editReply({content: "Não consegui adicionar cargo a ninguem"});
                msgDelete(message,0)
                return
            };
            
            embed.setDescription(desc);

            msgDelete(message,0);

            await interaction.editReply(
                {
                    content: "Qual Cargo?",
                    embeds: [embed],
                    components: [row]
                }
            );
        });
    };
};