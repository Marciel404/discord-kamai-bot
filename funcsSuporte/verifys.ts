import { APIGuildMember, GuildMember } from "discord.js"
const { memberManegements } = require("../db/moderation")
import { configData } from "..";

export function verifyRolesPermissions(member: GuildMember | APIGuildMember , roles: Array<string>) {
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
            return await member.roles.add([roles[0], roles[1], roles[2]], "Verificação de advertencia de entrada")
        }

        if (point == 2){
            return await member.roles.add([roles[0], roles[1]], "Verificação de advertencia de entrada")
        }

        if (point == 1){
            return await member.roles.add(roles[0], "Verificação de advertencia de entrada")
        }

        return false

    } catch (err) {
    }
}

export async function verifyRolesEntry(member: GuildMember){

    try{

        let roles = await memberManegements.findOne({"_id": member.id})
        for(var r1 in roles){
            if (r1 == "roles"){
                for(var r2 of roles[r1]){
                    try {
                        await member.roles.add(r2, "Verificação de cargo de entrada")
                    } catch {
                    }
                }
            }
        }


    } catch (err){
    }
}