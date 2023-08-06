import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import  dbQuestions  from "../../utils/dbQuestions"

export = {
    data: new SlashCommandBuilder()
    .setName("rmvperguntadodia")
    .setDescription("Remove uma pergunta na db do perguntas do dia")
    .setDMPermission(false)
    .addStringOption((option) => 
        option
        .setName("pergunta")
        .setDescription("Pergunta para remover")
        .setRequired(true)
        .setMinLength(10)
    ),
    name: "rmvperguntadodia",
    aliases: ["pdrmv", "rmvpd"],
    description: "Remove uma pergunta na db do perguntas do dia",
    roles: [
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute (msg: Message | ChatInputCommandInteraction){

        if (!msg.guild) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return
        let question: string = "";
        if (msg.type != InteractionType.ApplicationCommand){
            for (const p of msg.content.split(" ")) {
                if (p != msg.content.split(" ")[0]) {
                    question += `${p} `
                }
            }
        } else {
            question = msg.options.getString("pergunta")!
        }

        if (! await dbQuestions.deleteQuestion(question)){
            await msg.reply({content:"Essa pergunta não existe", ephemeral: true})
        } else {
            await msg.reply({content:`Pergunta removida`, ephemeral: true})
        }

    }
}