import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import  dbQuestions  from "../../utils/questionsDb"

export = {
    data: new SlashCommandBuilder()
    .setName("verperguntasdodia")
    .setDescription("Envia todas as perguntas registradas na db de perguntas")
    .setDMPermission(false)
    .addStringOption((option) => 
        option
        .setName("pergunta")
        .setDescription("Pergunta para adicionar")
        .setRequired(true)
        .setMinLength(10)
    ),
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

        if (! dbQuestions.getQuestions()){
            return await msg.reply({content: "Não existe perguntas salvas na db"})
        }
        await msg.reply({content:`Pergunta adicionada ${dbQuestions.getQuestions()}`, ephemeral: true})

    }
}