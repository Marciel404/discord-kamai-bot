import { APIUser, Guild, User } from "discord.js";
import { verifyRolesPermissions } from "../funcsSuporte/verifys";
import { configData } from "..";

const { MongoClient } = require("mongodb");

const cluster = new MongoClient(process.env.mongoKet)
const db = cluster.db(process.env.database_name)
export const moddb = db.collection("moderação")
export const memberManegements = db.collection("memberManegements")

export async function setCoolDown(member: User | APIUser, cooldownType: string, cooldown: any) {
    await memberManegements.updateOne(
        {_id: member.id},
        {$set: {[cooldownType]: cooldown}},
        {upsert: true}
    )
}
export async function daily_set(member: User, sequencia: Number){
    if (sequencia == 0){
        await memberManegements.updateOne({_id: member.id},{$set:{"economy.daily.sequencia": 0}}, {upsert:true})
    } else {
        await memberManegements.updateOne({_id: member.id},{$inc:{"economy.daily.sequencia": 1}}, {upsert:true})
    }

    
}
export async function getDailyVal(member: User){
    const val = await memberManegements.findOne({_id: member.id})
    let streak = 1 + val.economy.daily.sequencia
    let money = parseInt( `${Math.log10(streak) * configData.rewards.daily}` ) + configData.rewards.daily
    await inc_money(member, money)
    return money
}
export async function inc_money(member: User | APIUser, qnt: Number){
    await memberManegements.updateOne(
        {_id: member.id},
        {$inc: {"economy.money": qnt}},
        {upsert: true}
    )
}
export function adcTicket(qnt: any){
    moddb.updateOne(
        {_id: "kamaiMod"},
        {$inc: {"tickets": qnt}},
        {upsert: true}
    )
}
export async function adcAdvertencia(author: any, member: any, aprovador: any, motivo: string, data: string){
    await moddb.updateOne(
        {_id: "kamaiMod"},
        {$inc: {"AdvsQnt": 1}},
        {upsert: true}
    )
    moddb.findOne({"_id": "kamaiMod"})
    .then(async (opt: any) => {
        memberManegements.updateOne(
            {_id: member.id},
            {$push: {
                    "advertencias": {
                        "points": 1,
                        "author": `${author}`,
                        "aprovador": `${aprovador}`,
                        "motivo": `${motivo}`,
                        "data": `${data}`,
                        "warn_id": `${opt["AdvsQnt"]}`
                    }
                }
            },
            {upsert: true}
        )
    })

}
export async function rmvAdvertencia(warnid: string, guild: Guild){

    if (await memberManegements.findOne({"advertencias": {"$elemMatch": {"warn_id": warnid}}})) {
        const member = await memberManegements.findOne({"advertencias": {"$elemMatch": {"warn_id": warnid}}})
        await memberManegements.findOneAndUpdate({"advertencias": {"$elemMatch": {"warn_id": warnid}}},
                         {"$pull": {"advertencias": {"warn_id": warnid}}})

        const m = await guild.members.fetch(member._id)!

        if (m.communicationDisabledUntil){
            await member.timeout(null, "Remoção de advertencia");
        } 
        if (verifyRolesPermissions(m, [configData["roles"]["adv3"]])){

            await m.roles.remove(configData["roles"]["adv3"])
            return true

        } else if (verifyRolesPermissions(m, [configData["roles"]["adv2"]])){

            await m.roles.remove(configData["roles"]["adv2"])
            return true

        } else if (verifyRolesPermissions(m, [configData["roles"]["adv1"]])){

            await m.roles.remove(configData["roles"]["adv1"])
            return true

        }
        
    } else {
        return false
    }
}
export async function adcNotify(author: any, member: any, motivo: string, data: string){
    await moddb.updateOne(
        {_id: "kamaiMod"},
        {"$inc": {"NtfsQnt": 1}},
        {upsert: true}
    )
    moddb.findOne({_id: "kamaiMod"})
    .then( async (opt: any) => {
        memberManegements.updateOne(
            {_id: member.id},
            {$push: {
                Notifys: {
                    author: `${author}`,
                    motivo: `${motivo}`,
                    data: data,
                    notify_id: `${opt["NtfsQnt"]}`
                }
            }
            },
            {upsert: true}
        )
    })
}
export async function rmvNotify(warnid: string) {
    if (await memberManegements.findOne({"Notifys": {"$elemMatch": {"notify_id": warnid}}})) {
        await memberManegements.findOneAndUpdate(
            {"Notifys": {"$elemMatch": {"notify_id": warnid}}},
            {"$pull": {"Notifys": {"notify_id": warnid}}})
        return true
    } else {
        return false
    }
}
export async function warn_list(user_id: string) {

    try {
        const doc = await memberManegements.findOne({ "_id": user_id })
        let Total_points = 0
  
        if (doc && doc["advertencias"] && doc["advertencias"].find((warn: any) => warn != null)) {
            let warns = ""
            doc["advertencias"].forEach((element: any, i: any) => {
            if (element) {
                Total_points += parseInt(element["points"])
                warns += `**${i + 1} - ${element["motivo"]}** (id: ${element["warn_id"]})`
                warns += `\n↳ ${element["points"]} ponto${(!(element["points"] == 1)) ? "s" : ""} | Por: ${element["author"]} | Aprovada por: ${element["aprovador"]}| Em: ${element["data"]}\n`
    
            }
            });
            warns = `Advertencias (${Total_points}) \n` + warns
    
            let warnings = { "points": Total_points, "warns": warns }
    
            return Object.values(warnings)
        } else {
            return false
        }
  
    } catch (err) {
      console.log(err)
    }
}
export async function notifyList(user_id: string) {
  
    try {
        const doc = await memberManegements.findOne({ "_id": user_id })
    
        if (doc && doc["Notifys"] && doc["Notifys"].find((warn: any) => warn != null)) {
            let ntf = ""

            doc["Notifys"].forEach((element: any, i: any) => {
                ntf += `**${i + 1} - ${element["motivo"]}** (id: ${element["notify_id"]})`
                ntf += `\n↳ Por: ${element["author"]} | Em: ${element["data"]}\n`
            })

            let warnings = { "warns": ntf }

            return Object.values(warnings)
        } else {
            return false
        }

    } catch (err) {
        console.log(err)
    }
}