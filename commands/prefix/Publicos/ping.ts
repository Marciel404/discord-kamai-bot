import { Message } from "discord.js";

module.exports = {
    name: "ping",
    aliases: ["ms"],
    description: "Envia meu delay",
    async execute(msg: Message) {
        try {
            let pingingMsg = await msg.reply({ embeds: [{
                color: 0x57f287,
                description: "Calculando..."
            }]});
            await pingingMsg.edit({ embeds: [{
                color: 0x57f287,
                description: `**Pong!** meu ping é de ${pingingMsg.createdTimestamp - msg.createdTimestamp} ms`
            }]});
        } catch (error) {
            console.error(error)
        }
    }
}