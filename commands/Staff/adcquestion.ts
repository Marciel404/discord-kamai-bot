import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js";
import gamesDb from "../../utils/dbGames"
import logger from "../../logger";
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";

export = {
    data: new SlashCommandBuilder()
        .setName("adcperguntagame")
        .setDescription("Adiciona uma pergunta a algum jogo do bot")
        .addStringOption((option) =>
            option
                .setName("pergunta")
                .setDescription("Pergunta para adicionar")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("resposta")
                .setDescription("Resposta da pergunta")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("informativo")
                .setDescription("Informação para mostrar quando alguem acertar a pergunta")
        )
        .addStringOption((option) =>
            option
                .setName("jogo")
                .setDescription("Jogo que quer adicionar uma pergunta")
                .setChoices(
                    { name: "Quiz", value: "0" }
                )
        ),
    name: "adcperguntagame",
    description: "Adiciona uma pergunta a algum jogo do bot",
    aliases: ["adcpg"],
    roles: [
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute(msg: Message | ChatInputCommandInteraction) {

        if (!msg.guild) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return
        
        let opt
        let informativo

        if (msg.type === InteractionType.ApplicationCommand) {
            opt = (opt) ? msg.options.getString("jogo")?.toLowerCase() : "0"
            informativo = (informativo) ? msg.options.getString("informativo")?.toLowerCase() : ""
        } else {
            return msg.reply({ content: "Este comando está disponivel somente em slash" })
        }

        switch (opt) {
            case "quiz":
            case "0":
                try {
                    gamesDb.adcQuestion("quiz",
                        {
                            pergunta: msg.options.getString("pergunta"),
                            resposta: msg.options.getString("resposta"),
                            informativo: informativo
                        }
                    )
                    msg.reply({content: "Pergunta Adivcionada"})
                } catch (e) {
                    logger.error(e)
                }
                break
        }
    }
}