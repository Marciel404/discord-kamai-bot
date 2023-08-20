import { ChatInputCommandInteraction, Collection, Colors, Message } from "discord.js";
import logger from "../logger";

export const games: Collection<any, any> = new Collection()
const gamesPoints: any = []

const perguntas = [
	{
		pergunta: "Em que ano foi criado o canal do youtube do kamaitachi?",
		resposta: "2017",
        informativo: "Você sabia que o Kamaitachi decidou criar o canal depois de para com a banda que ele tinha?"
	},
	{
		pergunta: "Qual o primeiro nome do Kamaitachi?",
		resposta: "Rafael",
        informativo: ""
	}
]

export async function QuizGame(arg: Message | ChatInputCommandInteraction) {

    try {

        let pergunta = perguntas[Math.floor(Math.random() * perguntas.length)]

        const pergMessage = await arg.channel?.send({content: `${pergunta["pergunta"]}`});

        const collectorFilter = (m: Message) => !m.author.bot;

        const collector = arg.channel!.createMessageCollector({filter: collectorFilter, time: 60000});

        collector.on("collect", async (message: Message) => {

            if (message.content.toLowerCase() == pergunta["resposta"].toLowerCase()) {
                message.reply({content: "Certa resposta"})
                collector.stop();
                addpoint(arg.channelId, message.author.id)
                let rod = games.get(arg.channelId)["rodada"]
                for (var i = 0; i < 5; i++){
                }
                arg.channel?.send({embeds: [
                    {
                        title: "KamaiQuiz",
                        description: pergunta["informativo"],
                        footer: {
                            text: `Rodada ${rod}`
                        },
                        color: Colors.Green
                    }]
                })
                games.set(arg.channelId, {run: true, rodada: rod+1, game: "quiz"});
                pergMessage?.delete()
                new Promise(x => setTimeout(x,5000))
                QuizGame(arg);
            }

        });

        collector.on("end", async (end) => {

            if (collector.endReason == "time") {
                arg.channel?.send(`Tempo esgotado, quiz encerrado`);
                games.set(arg.channelId, {run: false, rodada: 0, game: "quiz"});
                pergMessage?.delete()
            };

        });

    } catch (e) {
        logger.error(e)
    }
    
}

function addpoint(channelId: string, userId: string){
    try {
        if (gamesPoints[channelId][userId] == undefined) {
            gamesPoints[channelId][userId] = 1
        } else {
            gamesPoints[channelId][userId] += 1  
        }
        gamesPoints[channelId].sort((a: any, b: any) => a - b);
    } catch (e) {
        console.log(e)
        gamesPoints[channelId] = {[userId]: 1}
    }

    console.log(gamesPoints[channelId])

}