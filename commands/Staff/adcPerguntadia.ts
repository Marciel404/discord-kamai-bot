import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import dbQuestions from "../../utils/questionsDb"
import logger from "../../logger";

export = {
    data: new SlashCommandBuilder()
        .setName("adcperguntadodia")
        .setDescription("Adiciona uma pergunta na db do perguntas do dia")
        .setDMPermission(false)
        .addStringOption((option) =>
            option
                .setName("pergunta")
                .setDescription("Pergunta para adicionar")
                .setRequired(true)
                .setMinLength(10)
        ),
    name: "adcperguntadodia",
    aliases: ["pdadc", "addpd"],
    description: "Adiciona uma pergunta na db do perguntas do dia",
    roles: [
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute(msg: Message | ChatInputCommandInteraction) {


        if (!msg.guild) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return
        let question: string = "";
        if (msg.type != InteractionType.ApplicationCommand) {
            for (const p of msg.content.split(" ")) {
                if (p != msg.content.split(" ")[0]) {
                    question += `${p} `
                }
            }
        } else {
            question = msg.options.getString("pergunta")!
        }

        await dbQuestions.saveQuestion(question)

        await msg.reply({ content: `Pergunta adicionada ${question}`, ephemeral: true })

    }
}