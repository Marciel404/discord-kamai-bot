import { ChatInputCommandInteraction, SlashCommandBuilder, Message, TextChannel, InteractionType } from "discord.js";
import { addReaction } from "../../funcsSuporte/messages";
import { configData } from "../..";
import logger from "../../logger";

export = {
    data: new SlashCommandBuilder()
    .setName("addreactionmessage")
    .setDescription("Adiciona reações a uma mensagem")
    .addStringOption((option) => 
        option
            .setName("message_id")
            .setDescription("Id da mensagem a adicionar emojis")
            .setRequired(true)
    )
    .addStringOption((option) => 
        option
            .setName("emojis")
            .setDescription("Reações a adicionar")
            .setRequired(true)
    )
    .addChannelOption((option) => 
        option
            .setName("canal")
            .setDescription("Canal que está a mensagem")
            .setRequired(false)
    )
    .setDMPermission(false),
    name: "addreactionmessage",
    description: "Adiciona reações a uma mensagem",
    aliases: ["addr", "reactionadd", "emojiaddmessage"],
    roles: [
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute(msg: Message | ChatInputCommandInteraction) {

        if (!msg.guild) return

        let emsg: any = false;
        let channel: string = "";
        let emojis =[];
        let msgId: string = "";

        if (msg.type == InteractionType.ApplicationCommand){
  
            channel = msg.options.getChannel("channel") ? msg.options.getChannel("channel")!.toString().replace(/[<#>]/g,"") : msg.channel!.toString().replace(/[<#>]/g,"")
            msgId = msg.options.getString("message_id", true)
            emojis = msg.options.getString("emojis", true).split(" ")
        } else {
            let msgArgs = msg.content.split(" ")

            if (!msgArgs[1]) {
                emsg = await msg.reply({content:"Argumento canal necessario"});
                return await addReaction(emsg, ["❌"]);
            }
            if (!msgArgs[2]) {
                emsg = await msg.reply({content:"Id da mensagem necessario"});
                return await addReaction(emsg, ["❌"]);
            }
            if (!msgArgs[3]){
                emsg = await msg.reply({content:"Você deve colocar pelo menos um emoji"});
                return await addReaction(emsg, ["❌"]);
            }

            msgId = msgArgs[2]
            channel = msgArgs[1].replace(/[<@>]/g, "")
            if (msgArgs[1] == "this") channel = msg.channel.id

            for (const i of msgArgs){
                if (i != msgArgs[0] && i != msgArgs[1] && i != msgArgs[2]){
                    emojis.push(i)
                }
            }
        }

        try {

            const c = await msg.guild.channels.fetch(channel) as TextChannel

            const msgR = await c.messages.fetch(msgId)

            await addReaction(msgR, emojis)

            await msg.reply({content: "Pronto reação adicionada", ephemeral: true})

        } catch (err) {

            await msg.reply({content: "Não encontrei o canal ou a mensagem desejada", ephemeral: true})

            logger.error(err)

        }

    }
}