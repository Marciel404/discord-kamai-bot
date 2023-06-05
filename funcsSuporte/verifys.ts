import { Client } from "discord.js"
import { memberManegements } from "../db/moderation"
import { configData } from "../utils/loader"

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

export async function verifyAdvertencia(member: any ){
    try{

        let point = 0
        const adv: any = await memberManegements.findOne({"_id": member.id})
        for( var a1 of adv){
            console.log(a1)
            if (a1["advertencias"]){
                console.log(a1["points"])
            }
        }

        if (point == 1){
            await member?.roles.add(configData["roles"]["adv1"])
        }
            
        if (point == 2){
            await member.roles.add([configData["roles"]["adv1"], configData["roles"]["adv2"]])
        }
        if (point == 3){
            await member.roles.add([configData["roles"]["adv1"], configData["roles"]["adv2"], configData["roles"]["adv3"]])
        }
            
    } catch (err) {
    }
}