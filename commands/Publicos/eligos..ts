import { ChatInputCommandInteraction, Message, SlashCommandBuilder, TextChannel, VoiceChannel } from "discord.js";
import { configData } from "../..";
import { karaokeAct } from "../../db/eligos";

export = {
    data: new SlashCommandBuilder()
    .setName("eligos")
    .setDescription("Chama um eligo para reger o Karaokê"),
    name: "eligos",
    aliases: ["regentes"],
    description: "Chama um eligo para reger o Karaokê",
    async execute(msg: Message | ChatInputCommandInteraction) {

        if (!msg.guild) return;

        await msg.reply({content: "Não se preocupe, logo logo vai vir alguém para ajudar", ephemeral: true})

        let regs_in_karaoke: Array<any> = []
        let regs_avaliables: Array<any> = []
        let regs_avaliablesID: Array<any> = []

        let channelK: any = await msg.guild.channels!.fetch(configData["channels"]["karaoke_voice"])
        for(const mem of channelK.members){
            if (mem[1]._roles.indexOf(configData["roles"]["equipe_karaoke"]) >= 0){
                regs_in_karaoke.push(mem[1])
            }
        }
        for (const aval of await karaokeAct.find({"available.state": true}).toArray()){
            let member = await msg.guild.members.fetch(aval["_id"].toString())
            if ( member && Object.values(member.roles)[0]._roles.indexOf(configData["roles"]["equipe_karaoke"]) >= 0){
                regs_avaliablesID.push(aval["_id"])
                regs_avaliables.push(member)
            }
        }

        if (regs_avaliables.length > 0){

            if (regs_in_karaoke.length > 0){

                for (const caps of (await msg.guild.members.fetch())
                .filter(member => Object.values(member.roles)[0]._roles.indexOf(configData["roles"]["capitaes_karaoke"]) >= 0)){

                    try{
                       await caps[1].send(`Pediram ajuda no karaoke, porém já tem alguns eligos no karaoke ${regs_in_karaoke}`)
                    } catch (err){
                    }

                }

            }

            let channelReges: any = await msg.guild.channels.fetch(configData["channels"]["reinoEligos"])
            await channelReges.send(`Pediram ajuda no karaoke ${regs_avaliables}`)

        } else if (regs_in_karaoke.length > 0){

            for (const caps of (await msg.guild.members.fetch())
            .filter(member => Object.values(member.roles)[0]._roles.indexOf(configData["roles"]["capitaes_karaoke"]) >= 0)){

                try{
                    await caps[1].send(`Pediram ajuda no Karaoke mas não tem ninguém disponivel, e tem alguns eligos no karaoke ${regs_in_karaoke}`)
                } catch (err){
                }

            }

        } else {

            for (const caps of (await msg.guild.members.fetch())
            .filter(member => Object.values(member.roles)[0]._roles.indexOf(configData["roles"]["capitaes_karaoke"]) >= 0)){
                try{
                    await caps[1].send(`Pediram ajuda no Karaoke mas não tem ninguém disponivel`)
                } catch (err){
                }
            }

        }

    }

}
