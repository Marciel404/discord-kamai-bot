import { Message } from "discord.js";
import logger from "../logger";

export async function msgDelete(message: Message, time: number){
    setTimeout(async () =>{
            await message.delete()
            .catch(async (err) => {
                console.log(err)
                let ms = await message.channel.send({content: "Por favor não apague as mensagens que eu mando aqui, que eu mesmo apago"});
                msgDelete(ms,3000);
            });
    }, time);
};

export async function addReaction(message: Message, reaction: Array<string>) {

    try {
        for (const i of reaction){
            if (i != "")
            await message.react(i)
        }
    } catch (err) {
        logger.error(err)
    }
}
