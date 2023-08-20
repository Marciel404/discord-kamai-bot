import { ChatInputCommandInteraction, Collection, Colors, Message } from "discord.js";
import logger from "../logger";
import { addReaction } from "./messages";
import gamesDb from "../utils/dbGames"

export const games: Collection<any, any> = new Collection()
const gamesPoints: Collection<any, any> = new Collection()

export async function QuizGame(arg: Message | ChatInputCommandInteraction) {

    try {

        const perguntas = await gamesDb.getArrayQuestion('quiz')

        let pergunta = perguntas[Math.floor(Math.random() * perguntas.length)]

        const pergMessage = await arg.channel?.send({ content: `${pergunta["pergunta"]!}` });

        const collectorFilter = (m: Message) => !m.author.bot;

        const collector = arg.channel!.createMessageCollector({ filter: collectorFilter, time: 60000 });

        collector.on("collect", async (message: Message) => {

            if (message.content.toLowerCase() == pergunta["resposta"]!.toLowerCase()) {
                message.reply({ content: "Certa resposta" })
                collector.stop();
                addpoint(arg.channelId, message.author.id)
                let rod = games.get(arg.channelId)["rodada"]
                addReaction(message, ["🌟"])
                arg.channel?.send({
                    embeds: [
                        {
                            title: "KamaiQuiz",
                            description: pergunta["informativo"],
                            footer: {
                                text: `Rodada ${rod}`
                            },
                            color: Colors.Green
                        }]
                })
                arg.channel?.send({
                    embeds: [await embedPoints(arg)]
                })
                games.set(arg.channelId, { run: true, rodada: rod + 1, game: "quiz" });
                pergMessage?.delete()
                await new Promise(x => setTimeout(x, 5000))
                QuizGame(arg);
            }

        });

        collector.on("end", async (end) => {

            if (collector.endReason == "time") {
                arg.channel?.send(`Tempo esgotado, quiz encerrado`);
                games.set(arg.channelId, { run: false, rodada: 0, game: "quiz" });
                pergMessage?.delete()
            };

        });

    } catch (e) {
        logger.error(e)
    }

}

function addpoint(channelId: string, userId: string) {
    try{
        try {
            let infos = gamesPoints.get(`${channelId}.${userId}`)
            if (infos == undefined) {
                throw "Sem pontos"
            }
            gamesPoints.set(`${channelId}.${userId}`, { channelId: channelId, userId: userId, points: infos["points"] + 1 })
        } catch {
            gamesPoints.set(`${channelId}.${userId}`, { channelId: channelId, userId: userId, points: 1 })
        }
    } catch (e) {
        logger.error(e)
    }
        
}

async function embedPoints(arg: Message | ChatInputCommandInteraction) {

    try {
        let pointsList: any = []
        gamesPoints.sort((a: any, b: any) => a.points - b.points).reverse().find(x => { 
            if (x.channelId === arg.channelId) {
                pointsList.push(x)
            } 
        })
        let arrayPoints = []
        for (const i of pointsList) {
    
            arrayPoints.push({
                name: `${(await arg.guild?.members.fetch(i.userId))?.displayName}`,
                value: `Pontos: ${i.points}`
            })
    
            if (arrayPoints.length == 5 || arrayPoints.length == pointsList.length) break
    
        }
        return {
            title: "Placar da partida",
            description: "Placar da partida das 5 pessoas que mais ponturam",
            fields: arrayPoints,
            color: Colors.Blurple
        }
    } catch (e) {
        logger.error(e)
        return {title: "Erro", description: "Erro desconhecido ao gerar o placar"}
    }
}