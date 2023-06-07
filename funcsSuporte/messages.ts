import { Client, Message } from "discord.js";
import { configData } from "../utils/loader";

export function msgDelete(message: Message){
    setTimeout(async () =>{
            await message.delete()
            .catch(async () => {
                let ms = await message.channel.send({content: "Por favor não apague as mensagens que eu mando aqui, que eu mesmo apago"})
                msgDelete(ms)
            })
    }, 3000)
}