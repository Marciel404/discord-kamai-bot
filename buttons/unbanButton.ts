import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    EmbedBuilder,
    Message
    } from "discord.js";
import { msgDelete } from "../funcsSuporte/messages";
import { configData } from "..";
import { verifyRolesPermissions } from "../funcsSuporte/verifys";

const roles: Array<string> = [
    configData["roles"]["staff"]["asmodeus"],
    configData["roles"]["staff"]["astaroth"]
]

export async function execute(interaction: ButtonInteraction) {

    if (!verifyRolesPermissions(interaction.member!, roles)) return await interaction.reply({content: "Sem permissão", ephemeral: true})

    await interaction.reply({content: "Envie os ids", ephemeral: true})
    const collectorFilter = (m: Message) => m.author.id === interaction.user.id
    const collector = interaction.channel!.createMessageCollector({ filter: collectorFilter, max: 1, time: 100000 });

    let button1 = new ButtonBuilder()
    .setCustomId("confirm")
    .setLabel("✔")
    .setStyle(4);

    let button2 = new ButtonBuilder()
    .setCustomId("deny")
    .setLabel("❌")
    .setStyle(4);

    const row = new ActionRowBuilder<any>()
    .addComponents(button1, button2);

    collector.on("collect", async (message: Message) => {

        let desc: string = ""
        const embed = new EmbedBuilder()
        .setTitle("Desbanimento")
        .setFooter({text: interaction.user.id})

        for (const i of message.content.split("\n")){

            try{
                let user = await interaction.client.users.fetch(i.replace(/[<@>]/g, ""))
                desc += `${user.username} ${user.id}\n`
            } catch {
                let msg = await interaction.channel!.send({content: `${i} não é um usuario`})
                msgDelete(msg,3000)
            }

        }

        if (desc.length == 0) {
            await interaction.editReply({content: "Não consegui desbabanir ninguem"});
            msgDelete(message,0)
            return
        }

        embed.setDescription(desc)

        await interaction.channel!.send(
            {
                embeds: [embed],
                components: [row]
            }
        )

        msgDelete(message,0)

    })   
}