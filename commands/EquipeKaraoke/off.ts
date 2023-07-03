import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import { karaokeAct } from "../../db/eligos";

export = {
    data: new SlashCommandBuilder()
    .setName("off")
    .setDescription("Poe em estado de indisponivel")
    .setDMPermission(false),
    name: "off",
    aliases: [],
    description: "Poe em estado de indisponivel",
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

        try {
            const doc = await karaokeAct.findOne({_id: author.id})
            if (doc && !doc["avaliable"]["state"]){

                await msg.reply({content: `Você precisa estar disponivel primeiro`})

            } else {
                await karaokeAct.updateOne(
                    {_id: author.id},
                    {$set: {
                        _id: author.id,
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