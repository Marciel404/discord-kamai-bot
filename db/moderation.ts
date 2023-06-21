const { MongoClient } = require("mongodb");

const cluster = new MongoClient(process.env.mongoKet)
const db = cluster.db(process.env.database_name)
export const moddb = db.collection("moderação")
export const memberManegements = db.collection("memberManegements")

export function RegsAtivos(qnt: any){
    moddb.updateOne(
        {_id: "kamaiMod"},
        {$inc: {"regsAtivos": qnt}},
        {upsert: true}
    )
}
export async function adcAdvertencia(author: any, member: any, aprovador: any, motivo: string, data: string){
    moddb.updateOne(
        {_id: "kamaiMod"},
        {$inc: {"AdvsQnt": 1}},
        {upsert: true}
    )
    const warn = await moddb.findOne({"_id": "kamaiMod"})
    const insert = {"advertencias": {
            "points": 1,
            "author": `${author}`,
            "aprovador": `${aprovador}`,
            "motivo": `${motivo}`,
            "data": `${data}`,
            "warn_id": `${warn["AdvsQnt"]}`
        }
    }
    memberManegements.updateOne(
        {_id: member.id},
        {$push: insert},
        {upsert: true}
    )
}
export async function rmvAdvertencia(warnid: string){
    const time = new Date()
    const dt = new Date().setHours(time.getHours()-3)

    if (await memberManegements.findOne({"advertencias": {"$elemMatch": {"warn_id": warnid}}})) {
        await memberManegements.findOneAndUpdate({"advertencias": {"$elemMatch": {"warn_id": warnid}}},
                         {"$pull": {"advertencias": {"warn_id": warnid}}})
        return true
    } else {
        return false
    }
}
export async function adcNotify(author: any, member: any, motivo: string, data: string){
    moddb.updateOne(
        {_id: "kamaiMod"}, {"$inc": {"NtfsQnt": 1}}, {upsert: true}
    )
    const ntf = await moddb.findOne({_id: "kamaiMod"})
    memberManegements.updateOne(
        {_id: member.id},
        {$push: {
            Notifys: {
                author: `${author}`,
                motivo: `${motivo}`,
                data: data,
                notify_id: `${ntf["NtfsQnt"]}`
            }
        }
        },
        {upsert: true}
    )
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