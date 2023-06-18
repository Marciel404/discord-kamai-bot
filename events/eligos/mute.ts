import { AuditLogEvent, Colors, EmbedBuilder, VoiceState } from "discord.js";
import { client } from "../../utils";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import { configData } from "../..";

client.on("voiceStateUpdate", async (old_state: VoiceState, new_state: VoiceState) => {

    let embed = new EmbedBuilder()

    if (old_state.selfMute && old_state.serverMute) {

        let auditlog = await new_state.guild.fetchAuditLogs({limit: 1, type: 24})
        let auditInfos = auditlog.entries.first()
        let author = new_state.guild.members.cache.get(auditInfos!.executor!.id)

        if (auditInfos?.action == 24 && verifyRolesPermissions(author!, [configData["roles"]["equipe_karaoke"]])) {

            if (!auditInfos!.changes[0].new){

                embed.setTitle(`${new_state.channel?.name}`)
                embed.setDescription(`🔈${new_state.member!} levou a redenção a ${author} e permitiu que voltasse a falar.`)
                embed.setColor(Colors.Red)

            }

            let channel: any =  new_state.guild.channels.cache.get(configData["channels"]["reinoEligos"])

            await channel.send({embeds: [embed]})

        }

    } else if (new_state.selfMute && new_state.serverMute){

        let auditlog = await new_state.guild.fetchAuditLogs({limit: 1, type: 24})
        let auditInfos = auditlog.entries.first()
        let author = new_state.guild.members.cache.get(auditInfos!.executor!.id)

        if (auditInfos?.action == 24 && verifyRolesPermissions(author!, [configData["roles"]["equipe_karaoke"]])) {

            if (auditInfos!.changes[0].new){

                embed.setTitle(`${new_state.channel?.name}`)
                embed.setDescription(`🔈${new_state.member!} foi calado por ${author}\n\nSerá que um dia encontrará a redenção?`)
                embed.setColor(Colors.Green)

            }

            let channel: any =  new_state.guild.channels.cache.get(configData["channels"]["reinoEligos"])

            await channel.send({embeds: [embed]})


        }
    }
})