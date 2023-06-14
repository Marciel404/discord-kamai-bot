import { Message } from "discord.js";

export = {
    name: "clear",
    aliases: [],
    description: "Limpa uma certa quantidade de mensagens",
    async execute(msg: Message){
        let channel: any = msg.guild?.channels.cache.get(msg.channel.id);
        if (!msg.content.split(" ")[1]?.match(/[0-9]/)) 
        return await msg.reply({content:"Argumento quantidade necessario"});
        if (msg.content.split(" ")[2]) 
        channel = msg.guild?.channels.cache.get(msg.content.split(" ")[2].replace(/[<#>]/g, ""));
        let qnt = Number(msg.content.split(" ")[1]);
        await msg.delete();
        if (qnt > 100) {
            qnt = 100;
        };
        let msgCount = await channel.bulkDelete(qnt,true);
        if (msgCount.size) {
            await channel.send({content: `O chat teve ${msgCount.size} mensagens apagadas`});
        } else {
            await msg.channel.send({content: "Não consegui apagar nenhuma mensagem por serem mais antigas que 14 dias"});
        };
        
    }
}