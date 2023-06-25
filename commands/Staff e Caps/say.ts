import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder, TextChannel } from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";

export = {
    data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Envia uma mensagem")
    .addChannelOption((option) =>
        option
        .setName("channel")
        .setDescription("Canal que para enviar a mensagem")
        .setRequired(true)
    )
    .addStringOption((option) => 
        option
        .setName("content")
        .setDescription("Conteudo para enviar")
        .setRequired(true)
    ),
    name: "say",
    aliases: [],
    description: "Envia uma mensagem",
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

        if (msg.type != InteractionType.ApplicationCommand) {
            if (!msg.content.toLowerCase().split(" ")[1]) return await msg.reply({content: "Argumento canal necessario"})
            if (!msg.content.toLowerCase().split(" ")[2]) return await msg.reply({content: "Argumento canal mensagem"})

            const channelId = msg.content.toLowerCase().split(" ")[1].replace(/[<#>]/gi,"")
            
            let args = ""

            for (const p of msg.content.split(" ")) {
                if (p != msg.content.split(" ")[0] && p != msg.content.split(" ")[1]) {
                    args += `${p} `
                }
            }

            const channel: any = await msg.guild!.channels.fetch(channelId)

            await channel.send({
                content: args,
            });
        } else {
            const channel: TextChannel =  msg.options.getChannel("channel")!

            await channel.send({content: msg.options.getString("content")!})

            await msg.reply({content: "Mensagem enviada", ephemeral: true})

        }
        
    },
}