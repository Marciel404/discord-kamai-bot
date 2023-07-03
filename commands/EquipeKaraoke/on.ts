import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import { karaokeAct } from "../../db/eligos";
import moment from "moment-timezone";

export = {
    data: new SlashCommandBuilder()
    .setName("on")
    .setDescription("Poe em estado de disponivel")
    .setDMPermission(false),
    name: "on",
    aliases: [],
    description: "Poe em estado de disponivel",
    roles: [
        configData["roles"]["equipe_karaoke"]
    ],
    async execute(msg: Message | ChatInputCommandInteraction) {

        if (!msg.guild) return
        if (msg.channel!.id != configData["channels"]["reinoEligos"]) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return
        let author;
        if (msg.type != InteractionType.ApplicationCommand){
            author = msg.author
        } else {
            author = msg.user
        }

        try{
            const doc = await karaokeAct.findOne({_id: author.id})
            if (doc && doc["avaliable"]["state"]){
    
                var t = moment(doc["avaliable"]["since"]).tz("America/Sao_Paulo").toNow().replace("in ","")
                await msg.reply({content: `Você está disponivel a ${t}`})

            } else {
                await karaokeAct.updateOne(
                    {_id: author.id},
                    {$set: {
                        _id: author.id,
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