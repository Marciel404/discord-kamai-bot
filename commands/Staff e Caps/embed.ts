import { ActionRowBuilder, ChatInputCommandInteraction, Colors, Message, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, range } from "discord.js";
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";

export = {
    data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Utilize o comando emb e siga os passos 😎")
    .setDMPermission(false),
    name: "embed",
    aliases: ["emb"],
    description: "Utilize o comando emb e siga os passos 😎",
    roles: [
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"],
        configData["roles"]["capitaes_karaoke"],
        configData["roles"]["capitaes_poem"],
        configData["roles"]["capitaes_arte"],
        configData["roles"]["capitaes_evento"]
    ],
    async execute(msg: Message | ChatInputCommandInteraction) {

        if (!msg.guild) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return

        let selecMenu = new StringSelectMenuBuilder()
        .setCustomId("optionsEmbed")
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
        
        await msg.reply({embeds: [
            {
                title: "O que deseja fazer com o embed", 
                color: Colors.Blurple, 
                description: `
1- Enviar um embed
2- Criar um embed
3- Deletar embed
4- Traz um embed que não esta dentro ainda no bot, mas esta em um canal
5- Editar uma mensagem que contem um embed`,
                footer: {text: `${msg.member?.user.id}`}
            }
        ], components: [row], ephemeral: true})

    }
}