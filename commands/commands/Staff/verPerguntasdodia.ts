import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";
import  dbQuestions  from "../../utils/dbQuestions"

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

        for ( const q of await dbQuestions.getQuestions() as String[]){
            if (msg.type == InteractionType.ApplicationCommand){
                await msg.followUp({content:`Perguntas Salvas \n${q}`, ephemeral: true})
            } else {
                await msg.reply({content:`Perguntas Salvas \n${q}`})
            }
        }
    }
}