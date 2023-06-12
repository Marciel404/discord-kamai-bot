import { Client, GuildMember, Interaction, Message } from "discord.js"
import { memberManegements } from "../db/moderation"
import { configData } from "../utils/loader"

export function verifyRoles(msg: Message | Interaction , roles: Array<string>) {
    let v = false;
    for (const r of roles){
        if (Object.values(msg.member!.roles)[0]["_roles"].indexOf(r) == 1){
            v = true
        };
    };
    return v
}

export async function verifyRegChannelName(client: Client, configData: any, moddb: any){
    console.log("Verificação de primeira instancia")
    let qnt = await moddb.findOne({"_id": "kamaiMod"})
    await client.guilds.fetch(configData["guild"])
    .then(async (guild) => {
        await guild.channels.fetch(configData["channels"]["registrosAtivos"])
        .then(async (channel) => {
            if (channel?.name != `registros-ativos-${qnt["regsAtivos"]}`){
                await channel?.edit({name: `registros-ativos-${qnt["regsAtivos"]}`})
            }
        })
    })
    setInterval(async () => {
        let qnt = await moddb.findOne({"_id": "kamaiMod"})
		await client.guilds.fetch(configData["guild"])
		.then(async (guild) => {
			await guild.channels.fetch(configData["channels"]["registrosAtivos"])
			.then(async (channel) => {
				if (channel?.name != `registros-ativos-${qnt["regsAtivos"]}`){
					await channel?.edit({name: `registros-ativos-${qnt["regsAtivos"]}`})
				}
			})
		})
    }, 300000)
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