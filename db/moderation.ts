import moment from 'moment';

const { MongoClient } = require("mongodb")
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
            "warn_id": warn["AdvsQnt"]
        }
    }
    memberManegements.updateOne(
        {_id: member.id},
        {$push: insert},
        {upsert: true}
    )
}
export function rmvAdvertencia(warnid: any){
    const time = new Date()
    const dt = new Date().setHours(time.getHours()-3)

    memberManegements.findOneAndUpdate({"advertencias": {"$elemMatch": {"warn_id": warnid}}},
                         {"$pull": {"advertencias": {"warn_id": warnid}},
                          "$set": {"UltimaRemoção": (moment(new Date(dt))).format("DD/MM/YYYY HH:mm")}})
}
export async function adcNotify(author: any, member: any, motivo: string, data: string,){
    moddb.updateOne(
        {"_id": "kamaiMod"}, {"$inc": {"NtfsQnt": 1}}, {upsert: true}
    )
    const ntf = await moddb.findOne({"_id": "kamaiMod"})
    memberManegements.updateOne(
        {"_id": member.id},
        {"$push": {
            "Notifys": {
                "author": `${author}`,
                "motivo": `${motivo}`,
                "data": data,
                "notify_id": ntf["NtfsQnt"]
            }
        }
        },
        {upsert: true}
    )
}
export async function rmvNotify(warnid: any) {

    memberManegements.findOneAndUpdate(
        {"Notifys": {"$elemMatch": {"notify_id": warnid}}},
        {"$pull": {"Notifys": {"notify_id": warnid}}})
    
}

export async function regsATVSRETURN() {
    return await moddb.findOne({"_id": "kamaiMod"})
}