import { Message } from "discord.js"
import { configData } from "../../..";
import { verifyRolesPermissions } from "../../../funcsSuporte/verifys";
import { karaokeAct } from "../../../db/eligos";

export = {
    name: "off",
    aliases: [],
    description: "Poe em estado de indisponivel",
    roles: [
        configData["roles"]["equipe_karaoke"]
    ],
    async execute(msg: Message) {
        
        if (msg.channel.id != configData["channels"]["reinoEligos"]) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return

        try {
            const doc = await karaokeAct.findOne({_id: msg.author.id})
            if (doc && !doc["avaliable"]["state"]){

                await msg.reply({content: `Você precisa estar disponivel primeiro`})

            } else {
                await karaokeAct.updateOne(
                    {_id: msg.author.id},
                    {$set: {
                        _id: msg.author.id,
                        avaliable: {state: false, since: null}
                    }},
                    {upsert: true}
                )
                await msg.reply({content: "Agora você não está mais disponivel"})
            }
            
        } catch (err){
            console.log(err)
        }
    },
}