import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import  dbQuestions  from "../../utils/questionsDb"

export = {
    data: new SlashCommandBuilder()
    .setName("verperguntasdodia")
    .setDescription("Envia todas as perguntas registradas na db de perguntas")
    .setDMPermission(false),
    name: "verperguntasdodia",
    aliases: ["psdver", "vpsd"],
    description: "Envia todas as perguntas registradas na db de perguntas",
    roles: [
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute (msg: Message | ChatInputCommandInteraction){

        if (!msg.guild) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return

        if (msg.type == InteractionType.ApplicationCommand){
            await msg.deferReply({ephemeral: true})
        }

        if (!await dbQuestions.getQuestions()){
            return await msg.reply({content: "Não existe perguntas salvas na db"})
        }

        let questionsOrg = ""

        for ( const q of await dbQuestions.getQuestions() as String[]){
            questionsOrg += `${q}\n\n`
            if (msg.type == InteractionType.ApplicationCommand){
                if (questionsOrg.length == 500){
                    await msg.followUp({content:`Perguntas Salvas \n${questionsOrg}`, ephemeral: true})
                    questionsOrg = ""
                } else {
                    await msg.followUp({content:`Perguntas Salvas \n${questionsOrg}`, ephemeral: true})
                }
            } else {
                if (questionsOrg.length == 500){
                    await msg.reply({content:`Perguntas Salvas \n${questionsOrg}`})
                    questionsOrg = ""
                } else {
                    await msg.reply({content:`Perguntas Salvas \n${questionsOrg}`})
                }
            }
        }
    }
}