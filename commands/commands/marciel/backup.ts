import { Message } from "discord.js"
import { verifyUserId } from "../../funcsSuporte/verifys"
import { memberManegements, moddb } from "../../db/moderation"
import { poemAct, karaokeAct, artAct } from "../../db/equipes"
import { Config, JsonDB } from "node-json-db"
import moment from "moment-timezone"
import logger from "../../logger"

export = {
    name: "backup",
    description: "Envia os arquivos para backup",
    async execute(msg: Message){

        if (!verifyUserId(msg.author,["485801281621852175"])) return

        await msg.channel.send({content: "Iniciando backup"})

        const AdmZip = require("adm-zip");
        const zip = new AdmZip()
        
        const memberMDB = [await memberManegements.find().toArray(), "memberMDB"]
        const modDB = [await moddb.find().toArray(), "modDB"]
        const karaokeACTDB = [await karaokeAct.find().toArray(), "karaokeActDB"]
        const poemACTDB = [await poemAct.find().toArray(),"poemActDB"]
        const arteACTDB = [await artAct.find().toArray(), "arteActDB"]
        const dbEmbeds = [await new JsonDB(new Config("dbembeds", true, true)).getData("/"), "dbEmbeds"]
        const dbQuestions = [await new JsonDB(new Config("dbquestions", true, true)).getData("/"), "dbQuestions"]

        let alls = [memberMDB,modDB,karaokeACTDB,poemACTDB,arteACTDB,dbEmbeds,dbQuestions]

        for (const a of alls) {
            let dbJ = new JsonDB(new Config(`backups/${a[1]}`,true,true))
            dbJ.push("/",a[0],true)
        }

        setTimeout(() => {

            for (const a of alls) {
                zip.addLocalFile(`backups/${a[1]}.json`)
            }
    
            zip.writeZip("backups.zip");
    
            msg.guild?.members.fetch("485801281621852175")
            .then(async (user) =>{
                const date = moment(msg.createdTimestamp).tz("America/Sao_Paulo")
                await user.send({content: `Data: ${date.format("DD/MM/YYYY")}`, files: ["backups.zip"]})
                await msg.channel.send({content: `Zip Enviado`})
            })
            .catch((err)=>{
                logger.error(err)
            })

        }, 5000)

    }
}