import { ChannelType, OverwriteType, PermissionFlagsBits, VoiceState } from "discord.js";
import { client } from "../utils";
import { configData } from "..";
import { verifyRoles } from "../funcsSuporte/verifys";

const roles: Array<any> = [
    configData["roles"]["ntb"],
    configData["roles"]["nvl100"],
    configData["roles"]["staff"]["staff1"],
    configData["roles"]["staff"]["staff2"],
    configData["roles"]["valak"],
    configData["roles"]["artmes1"],
    configData["roles"]["artmes2"]
]

// Call PV administrator
client.on("voiceStateUpdate", async (old_state: VoiceState, new_state: VoiceState) =>{
    if (new_state.channel?.id === configData["calls"]["espera"] && verifyRoles(new_state.member!, roles)){
        const channel: any = new_state.guild.channels.cache.find(channel => channel.type === 2 && channel.name === `PV [${new_state.member?.displayName}]`)
        if (channel){
            new_state.member!.voice.setChannel(channel)
        } else {
            const everyone = new_state.guild.roles.cache.get(new_state.guild.id)
            const callPv = await new_state.guild.channels.create(
                {
                    name: `PV [${new_state.member?.displayName}]`,
                    type: ChannelType.GuildVoice,
                    parent: new_state.channel!.parent,
                    permissionOverwrites:[
                        {
                            id:new_state.member!.id,
                            allow:[PermissionFlagsBits.MoveMembers,PermissionFlagsBits.Connect],
                            type: OverwriteType.Member
                        },
                        {
                            id:everyone!.id,
                            deny: [PermissionFlagsBits.Connect],
                            allow: [PermissionFlagsBits.Stream], 
                            type: OverwriteType.Role,
                        },
                        {
                            id: configData.roles.bots,
                            allow: [PermissionFlagsBits.Connect],
                            type: OverwriteType.Role
                        }
                    ]
                }
            )
            await new_state.member!.voice.setChannel(callPv)
        }
    } else if (old_state.channel && old_state.channel.name.indexOf("PV [") >= 0 && old_state.channel.members.size === 0){
        await old_state.channel.delete("O canal pv ficou vazio")
    }
})