import { Channel, Client, Message, TextChannel } from "discord.js";

export function msgDelete(message: Message){
    setTimeout(async () =>{
            await message.delete()
            .catch(async () => {
                let ms = await message.channel.send({content: "Por favor não apague as mensagens que eu mando aqui, que eu mesmo apago"})
                msgDelete(ms)
            })
    }, 3000)
}

export async function msgCountInitDelete(client: Client, id: string){

}