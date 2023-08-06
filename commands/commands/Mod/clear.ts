import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js";
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";

export = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Limpa uma certa quantidade de mensagens")
    .addNumberOption((option) =>
        option
        .setName("qnt")
        .setDescription("Quantidade de mensagens")
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    )
    .addChannelOption((option) =>
        option
        .setName("channel")
        .setDescription("Canal para limpar as mensagens")
        .setRequired(false)
    )
    .setDMPermission(false),
    name: "clear",
    aliases: [],
    description: "Limpa uma certa quantidade de mensagens",
    roles: [
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["staff"]["astaroth"],
        configData["roles"]["staff"]["ormenus"],
    ],
    async execute(msg: Message | ChatInputCommandInteraction){

        if (!msg.guild) return;

        if (!verifyRolesPermissions(msg.member!, this.roles)) return;

        let channel: any = msg.guild?.channels.cache.get(msg.channel!.id);

        let qnt: number = 0;

        if (msg.type != InteractionType.ApplicationCommand){

            if (!msg.content.split(" ")[1]?.match(/[0-9]/)) return await msg.reply({content:"Argumento quantidade necessario"});

            if (msg.content.split(" ")[2]) channel = msg.guild?.channels.cache.get(msg.content.split(" ")[2].replace(/[<#>]/g, ""));

            qnt = Number(msg.content.split(" ")[1]);

            await msg.delete();

        } else {

            qnt = msg.options.getNumber("qnt")!;

            if (msg.options.getChannel("channel")) channel = msg.options.getChannel("channel");

            await msg.reply({content: "Começando", ephemeral: true})

        };

        if (qnt > 100) {

            qnt = 100;

        };

        let msgCount = await channel.bulkDelete(qnt,true);

        if (msgCount.size) {

            await channel.send({content: `O chat teve ${msgCount.size} mensagens apagadas`});

        } else {

            await msg.channel!.send({content: "Não consegui apagar nenhuma mensagem por serem mais antigas que 14 dias"});

        };

    }
}