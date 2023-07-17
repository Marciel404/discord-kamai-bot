import { Colors, EmbedBuilder, Message, MessageType } from "discord.js";
import { client } from "../../utils";
import { configData } from "../..";
import logger from "../../logger";

client.on("messageCreate", async (message: Message) => {

    if (!message.guild && message.guild!.id != configData["guild"]) return

    if(message.type ==  MessageType.ThreadCreated  && message.system){
        await message.delete()
    }

    try{
        if (/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/gi.test(message.content.replace(/\s/gi, "")) && Object.values(message.member!.roles)[0]["_roles"].length == 0){
            await message.delete()

            const scamLog: any = message.guild!.channels.cache.find(channel => channel.type == 12 && channel.id == configData["channels"]["scamlog"])

            const emb = new EmbedBuilder()
                        .setTimestamp(message.createdTimestamp)
                        .setDescription(
                            `\`\`\`
${message.content}
                            \`\`\`
                            `
                        )
                        .setTitle("Possivel SCAM => "+ message.author.username)
                        .setColor(Colors.Red)
                        .setFooter({text:message.author.id})
                        .setThumbnail(message.author.avatarURL())

            await scamLog.send({embeds:[emb]})
        }
    } catch (err) {

        logger.error(err)

    }
})