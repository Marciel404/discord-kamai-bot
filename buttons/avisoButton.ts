import {
    ActionRowBuilder,
    ButtonInteraction,
    EmbedBuilder,
    Message,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
    } from "discord.js";
import { verifyRoles } from "../funcsSuporte/verifys"
import { motivosList } from "../stringSelects/motivos";
import { configData } from "..";
import { msgDelete } from "../funcsSuporte/messages";

const roles: Array<any> = [
    configData["roles"]["staff"]["staff1"],
    configData["roles"]["staff"]["staff2"]
]

export async function execute(interaction: ButtonInteraction) {

    if (!verifyRoles(interaction, roles)) return await interaction.reply({content: "Sem permissão", ephemeral: true})

    let selecMenu = new StringSelectMenuBuilder()
    .setCustomId("motivos")
    .setMinValues(1)
    .setPlaceholder("Motivo da Notificação")

    for (const i of motivosList) {
        selecMenu.addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel(i["label"])
            .setEmoji(i["emoji"])
            .setValue(i["value"])
        )
    }

    const row = new ActionRowBuilder<any>()
    .addComponents(selecMenu)

    await interaction.reply({content: "Envie os ids", ephemeral: true})
    const collectorFilter = (m: Message) => m.author.id === interaction.user.id
    const collector = interaction.channel!.createMessageCollector({ filter: collectorFilter, max: 1, time: 100000 });

    collector.on("collect", async (message: Message) => {

        let desc: string = ""
        const embed = new EmbedBuilder()
        .setTitle("Notifação")
        .setFooter({text: interaction.user.id})

        for (const i of message.content.split("\n")){

            try {
                let member = await interaction.guild!.members.fetch(i.replace(/[<@>]/g, ""))
                desc += `${member}\n`
            } catch {
                let msg = await interaction.channel!.send({content: `${i} não é um usuario no servidor`})
                msgDelete(msg,3000)
            };
        };
        
        embed.setDescription(desc);

        await interaction.editReply(
            {
                content: "Qual motivo?",
                embeds: [embed],
                components: [row]
            }
        );
        msgDelete(message,0)
    })
    
}