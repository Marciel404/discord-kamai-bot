import { ChatInputCommandInteraction, Message, SlashCommandBuilder, VoiceChannel } from "discord.js";
import { configData } from "../..";
import { karaokeAct } from "../../db/equipes";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import logger from "../../logger";

export = {
    data: new SlashCommandBuilder()
        .setName("eligos")
        .setDescription("Chama um eligo para reger o Karaokê")
        .setDMPermission(false),
    name: "eligos",
    aliases: ["regentes"],
    description: "Chama um eligo para reger o Karaokê",
    async execute(msg: Message | ChatInputCommandInteraction) {

        try {

            if (!msg.guild) return;

            if (!verifyRolesPermissions(msg.member!, [configData.roles.staff.staff1, configData.roles.staff.staff2]) && msg.channel?.id != configData["channels"]["commands"]) return

            await msg.reply({ content: "Não se preocupe, logo logo vai vir alguém para ajudar", ephemeral: true })

            let regs_in_karaoke: Array<any> = []
            let regs_avaliables: Array<any> = []
            let regs_avaliablesID: Array<any> = []

            let channelK = await msg.guild.channels!.fetch(configData["channels"]["karaoke_voice"]) as VoiceChannel

            for (const mem of channelK.members) {
                if (verifyRolesPermissions(mem[1], [configData["roles"]["equipe_karaoke"]])) {
                    regs_in_karaoke.push(mem[1])
                }
            }

            for await (const aval of karaokeAct.find({ "avaliable.state": true }) ){
                let member = await msg.guild.members.fetch(aval["_id"])
                if (member && verifyRolesPermissions(member, [configData["roles"]["equipe_karaoke"]])) {
                    regs_avaliablesID.push(aval["_id"])
                    regs_avaliables.push(member)
                }
            }

            if (regs_avaliables.length > 0) {

                if (regs_in_karaoke.length > 0) {

                    for (const caps of (await msg.guild.members.fetch())
                        .filter(member => verifyRolesPermissions(member, [configData["roles"]["capitaes_karaoke"]]))) {

                        try {
                            await caps[1].send(`Pediram ajuda no karaoke, porém já tem alguns eligos no karaoke ${regs_in_karaoke}`)
                        } catch (err) {
                            logger.error(err)
                        }

                    }

                }

                let channelReges: any = await msg.guild.channels.fetch(configData["channels"]["reinoEligos"])
                await channelReges.send(`Pediram ajuda no karaoke ${regs_avaliables}`)

            } else if (regs_in_karaoke.length > 0) {

                for (const caps of (await msg.guild.members.fetch())
                    .filter(member => verifyRolesPermissions(member, [configData["roles"]["capitaes_karaoke"]]))) {

                    try {
                        await caps[1].send(`Pediram ajuda no Karaoke mas não tem ninguém disponivel, e tem alguns eligos no karaoke ${regs_in_karaoke}`)
                    } catch (err) {
                        logger.error(err)
                    }

                }

            } else {

                for (const caps of (await msg.guild.members.fetch())
                    .filter(member => verifyRolesPermissions(member, [configData["roles"]["capitaes_karaoke"]]))) {
                    try {
                        await caps[1].send(`Pediram ajuda no Karaoke mas não tem ninguém disponivel`)
                    } catch (err) {
                        logger.error(err)
                    }
                }

            }

        } catch (err) {
            logger.error(err)
        }

    }

}
