import { configData } from "../utils/loader"
import { verifyRoles } from "../funcsSuporte/verifyRoles";
import { motivosList } from "../stringSelects/motivos";
import { 
    ButtonInteraction,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
    EmbedBuilder,
    Message,
    } from "discord.js";

const roles: Array<any> =[
    configData["roles"]["staff"]["staff1"],
    configData["roles"]["staff"]["staff2"]
]
export async function execute(interaction: ButtonInteraction) {

    if (!verifyRoles(interaction, roles)) return await interaction.reply({content: "Sem permissão", ephemeral: true})
    
    let selecMenu: StringSelectMenuBuilder = new StringSelectMenuBuilder()
    .setCustomId("motivos")
    .setMinValues(1)
    .setPlaceholder("Motivo do banimento")
    
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
        .setTitle("Banimento")
        .setFooter({text: interaction.user.id})

        const client = await interaction.guild!.members.fetch(interaction.client.user.id)

        for (const i of message.content.split("\n")){

            try {
                let member = await interaction.guild!.members.fetch(i.replace(/[<@>]/g, ""))

                if (member.roles.highest.position >= client.roles.highest.position){
                    let msg = await interaction.channel!.send({content: `Não consego banir o membro ${member}`});
                    setTimeout(async () =>{
                        await msg.delete()
                    }, 3000)
                } else {
                    desc += `${member}\n`
                }
            } catch {
                try{
                    let user = await interaction.client.users.fetch(i.replace(/[<@>]/g, ""))
                    desc += `${user.username} ${user.id}\n`
                } catch {
                    let m = await interaction.channel!.send({content: `${i} não é um usuario`})
                    setTimeout(async () =>{
                        await m.delete()
                    }, 3000)
                }
                
            }
        }
        if (desc.length == 0) {
            await interaction.editReply({content: "Não consegui banir ninguem"});
            await message.delete()
            return
        }
        
        embed.setDescription(desc)

        await interaction.editReply(
            {
                content: "Qual motivo?",
                embeds: [embed],
                components: [row]
            }
        )

        await message.delete()
        
    })
}