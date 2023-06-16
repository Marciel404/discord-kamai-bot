import { APIGuildMember, GuildMember, Interaction, Message, VoiceState } from "discord.js"
const { memberManegements } = require("../db/moderation")
import { configData } from "..";

export function verifyRoles(member: GuildMember | APIGuildMember , roles: Array<string>) {
    let v = false;
    for (const r of roles){
        if (Object.values(member.roles)[0]["_roles"].indexOf(r) >= 0){
            v = true
        };
    };
    return v
}

export async function verifyAdvertenciaEntry(member: GuildMember){

    try{

        let point = 0
        let adv = await memberManegements.findOne({"_id": member.id})
        for(var a1 in adv){
            if (a1 == "advertencias"){
                for(var a2 of adv[a1]){
                    point += a2["points"]
                }
            }
        }

        const roles: Array<string> = [configData["roles"]["adv1"], configData["roles"]["adv2"], configData["roles"]["adv3"]]
        
        if (point == 3){
            return await member.roles.add([roles[0], roles[1], roles[2]])
        }

        if (point == 2){
            return await member.roles.add([roles[0], roles[1]])
        }

        if (point == 1){
            return await member.roles.add(roles[0])
        }

        return false

    } catch (err) {
        console.log(err)
    }
}