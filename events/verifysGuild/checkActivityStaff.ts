import { Message, Presence, VoiceState } from "discord.js";
import { client } from "../../utils";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import { configData } from "../..";
import actStaff  from "../../utils/dbActStaff"

const roles: Array<string> = [
    configData["roles"]["staff"]["asmodeus"],
    configData["roles"]["staff"]["astaroth"],
    configData["roles"]["staff"]["ormenus"],
    configData["roles"]["staff"]["acacus"]
]

client.on("messageCreate", async (msg: Message) => {

    try {
        if (verifyRolesPermissions(msg.member!,roles) && !msg.author.bot && msg.guild){
            actStaff.adcActMessage(msg.member!, msg.channel.id)
        }
    } catch {
    }

})

client.on("presenceUpdate", async (oldPresence: Presence | null, newPresence: Presence | null) => {

    try{
        if (verifyRolesPermissions(newPresence!.member!,roles) && !newPresence?.user?.bot){
            actStaff.adcActPresence(newPresence?.member!,oldPresence!, newPresence!)
        }    
    } catch {
    }
})

client.on("voiceStateUpdate",async (oldState: VoiceState, newState: VoiceState) => {

    try{
        if (verifyRolesPermissions(oldState!.member!,roles) && !oldState.member?.user.bot){
            actStaff.adcActVoice(oldState.member!, oldState, newState)
        }
    } catch{
    }

})