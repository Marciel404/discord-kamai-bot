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

        if (!await dbQuestions.getQuestions()){
            return await msg.reply({content: "Não existe perguntas salvas na db"})
        }

        let questionsOrg = ""

        for ( const q of await dbQuestions.getQuestions() as String[]){
            questionsOrg += `${q}\n\n`
        }

        await msg.reply({content:`Perguntas Salvas \n${questionsOrg}`, ephemeral: true})

    }
}