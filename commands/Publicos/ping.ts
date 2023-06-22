import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";

export = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Envia meu ping"),
    name: "ping",
    aliases: ["ms"],
    description: "Envia meu delay",
    async execute(msg: Message | ChatInputCommandInteraction) {

        if (!msg.guild) return;

        try {

            let pingingMsg = await msg.reply({ embeds: [{
                color: 0x57f287,
                description: "Calculando..."
            }], ephemeral: true});
            
            await pingingMsg.edit({ embeds: [{
                color: 0x57f287,
                description: `**Pong!** meu ping é de ${pingingMsg.createdTimestamp - msg.createdTimestamp} ms`
            }]});

        } catch (error) {
            console.error(error)
        };
    }
};