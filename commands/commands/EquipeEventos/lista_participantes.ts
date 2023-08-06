import { 
    ActionRowBuilder,
    ButtonBuilder,
    ChatInputCommandInteraction,
    Message,
    SlashCommandBuilder 
} from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";

export = {
    data: new SlashCommandBuilder()
    .setName("lista_evento")
    .setDescription("Envia a lista para as pessoas entrarem no evento")
    .setDMPermission(false),
    name: "lista_evento",
    aliases: ["levento"],
    description: "Envia a lista para as pessoas entrarem no evento",
    roles: [
        configData["roles"]["equipe_evento"],
        configData["roles"]["capitaes_evento"],
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute(msg: Message | ChatInputCommandInteraction) {
        
        if (!msg.guild) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return

        await msg.reply({content: "Enviado", ephemeral: true})

        const b1 = new ButtonBuilder()
        .setCustomId("entrarLista")
        .setLabel("Entrar")
        .setStyle(3)
        const b2 = new ButtonBuilder()
        .setCustomId("sairLista")
        .setLabel("Sair")
        .setStyle(4)
        const b3 = new ButtonBuilder()
        .setCustomId("finalizarLista")
        .setLabel("Finalizar")
        .setStyle(2)
        const buttonsEvento = new ActionRowBuilder<any>()
        .addComponents(b1,b2,b3)

        const channel: any = await msg.guild.channels.fetch(configData["channels"]["participantes_evento"])
        await channel!.send({embeds: [{title: "Lista participantes"}], components:[buttonsEvento]})
    },
}
