import { ExportReturnType, createTranscript } from "discord-html-transcripts";
import {Message} from "discord.js"
export = {
    name: "teste",
    aliases: [],
    async execute(msg: Message){
        let channel: any = msg.channel
        await msg.reply({content: `${channel.parentId}`})
    }
}