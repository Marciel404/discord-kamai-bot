import { ChatInputCommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";

export = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Envia meu ping")
    .setDMPermission(false),
    name: "ping",
    aliases: ["ms"],
    description: "Envia meu delay",
    async execute(msg: Message | ChatInputCommandInteraction) {

        if (!msg.guild) return;

        if (!verifyRolesPermissions(msg.member!,[configData.roles.staff.staff1, configData.roles.staff.staff2]) && msg.channel?.id != configData["channels"]["commands"]) return

        try {

            let pingingMsg = await msg.reply({ embeds: [{
                color: 0x57f287,
                description: "Calculando..."
            }], ephemeral: true});
            
            await pingingMsg.edit({ embeds: [{
                color: 0x57f287,
                description: `**Pong!** \nMeu ping é de ${Date.now() - msg.createdTimestamp}ms\nO ping da api é ${Math.round(msg.client.ws.ping)}ms`
            }]});

        } catch (error) {
            console.error(error)
        };
    }
};