import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js";
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";

export = {
    data: new SlashCommandBuilder()
    .setName("membermessagedelete")
    .setDescription("Limpa as mensagens de um membro de todos os canais do server em um periodo de 14 dias")
    .addUserOption((option) =>
        option
        .setName("member")
        .setDescription("Membro a ser limpada as mensagens")
        .setRequired(true)
    ),
    name: "membermessagedelete",
    aliases: ["mmdel", "mmd"],
    description: "Limpa as mensagens de um membro de todos os canais do server em um periodo de 14 dias",
    roles: [
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["staff"]["astaroth"],
        configData["roles"]["staff"]["ormenus"],
    ],
    async execute(msg: Message | ChatInputCommandInteraction){

        if (!msg.guild) return

        if (!verifyRolesPermissions(msg.member!, this.roles)) return

        let authorId: string;

        if (msg.type != InteractionType.ApplicationCommand){

            const msgArgs = msg.content.split(" ")

            if (msgArgs.length == 0 || !msgArgs[1]?.match(/[0-9]/)) return await msg.reply({content: "Mencione o membro"})

            authorId = msgArgs[1].replace(/[<@>]/g, "")

        } else {
            authorId = msg.options.getUser("member")!.id
        }
        await msg.reply({content: "Começando", ephemeral: true})
        let channels = await msg.guild.channels.fetch()
        for (const c of channels!){
            try{
                if (c[1]!.type === 0){
                    let messages = (await c[1]!.messages.fetch()).filter(message => message.author.id === authorId)
                    await c[1]?.bulkDelete(messages, true)
                }
            } catch (err) {
            }
        }
    }
}