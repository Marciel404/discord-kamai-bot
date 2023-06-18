import { Message } from "discord.js"
import { configData } from "../../..";
import { verifyRolesPermissions } from "../../../funcsSuporte/verifys";
import { karaokeAct } from "../../../db/eligos";
import moment from "moment-timezone";

export = {
    name: "on",
    aliases: [],
    description: "Poe em estado de disponivel",
    roles: [
        configData["roles"]["equipe_karaoke"]
    ],
    async execute(msg: Message) {

        if (msg.channel.id != configData["channels"]["reinoEligos"]) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return

        try{
            const doc = await karaokeAct.findOne({_id: msg.author.id})
            if (doc && doc["avaliable"]["state"]){
    
                var t = moment(doc["avaliable"]["since"]).tz("America/Sao_Paulo").toNow().replace("in ","")
                await msg.reply({content: `Você está disponivel a ${t}`})

            } else {
                await karaokeAct.updateOne(
                    {_id: msg.author.id},
                    {$set: {
                        _id: msg.author.id,
                        avaliable: {state: true, since: new Date().getTime()}
                    }},
                    {upsert: true}
                )
                await msg.reply({content: "Agora você está disponivel"})
            }
            
        } catch (err){
            console.log(err)
        }
        
    },
}