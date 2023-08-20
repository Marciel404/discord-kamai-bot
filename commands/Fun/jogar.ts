import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js";
import { QuizGame, games } from "../../funcsSuporte/games";

export = {
    data: new SlashCommandBuilder()
    .setName("jogar")
    .setDescription("Joga um jogo do bot")
    .addStringOption((option)=>
        option
            .setName("jogo")
            .setDescription("Jogo que quer jogar")
            .setChoices(
                {name: "Quiz", value: "0"}
            )
    ),
    name: "jogar",
    description: "Joga um jogo do bot",
    aliases: ["play"],
    async execute(msg: Message | ChatInputCommandInteraction){

        let opt

        if (msg.type === InteractionType.ApplicationCommand){
            opt = (opt) ? msg.options.getString("jogo")?.toLowerCase() : "0"
        } else {
            opt = msg.content.split(" ")[1].toLowerCase()
        }

        switch (opt) {
            case "quiz":
            case "0":
                try {
                    let infos = games.get(msg.channelId)
                    if (infos["run"] == true){
                        return msg.reply({content: `Já tem uma partida de ${infos["game"]} em execução neste canal`, ephemeral: true})
                    } else {
                        games.set(msg.channelId, {run: true, rodada: 1, game: "quiz"})
                    }
                } catch {
                    games.set(msg.channelId, {run: true, rodada: 1, game: "quiz"})
                }
                msg.reply({content: "Iniciando partida", ephemeral: true})
                QuizGame(msg)
                break
        }
    }
}