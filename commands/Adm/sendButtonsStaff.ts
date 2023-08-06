import { 
    ActionRowBuilder,
    ButtonBuilder,
    ChatInputCommandInteraction,
    InteractionType,
    Message,
    SlashCommandBuilder
} from "discord.js"
import { verifyRolesPermissions } from "../../funcsSuporte/verifys"
import { configData } from "../..";

export = {
    date: new SlashCommandBuilder()
    .setName("sendbuttonsstaff")
    .setDescription("Envia os botões do registros ativos")
    .setDMPermission(false),
    name: "sendbuttonsstaff",
    aliases: ["sendbts"],
    description: "Envia os botoes de Registros Ativos",
    roles: [
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["staff"]["astaroth"]
    ],
    async execute( msg: Message | ChatInputCommandInteraction){

        if (!msg.guild) return
        if (!verifyRolesPermissions(msg.member!, this.roles)) return

        const bBan = new ButtonBuilder()
        .setCustomId("banButton")
        .setLabel("BAN")
        .setStyle(4)

        const bUnBan = new ButtonBuilder()
        .setCustomId("unbanButton")
        .setLabel("UNBAN")
        .setStyle(4)

        const bAdv = new ButtonBuilder()
        .setCustomId("advertenciaButton")
        .setLabel("ADVERTENCIA")
        .setStyle(1)

        const bNtf = new ButtonBuilder()
        .setCustomId("avisoButton")
        .setLabel("NOTIFICAR")
        .setStyle(2)

        const bCg = new ButtonBuilder()
        .setCustomId("cargosButton")
        .setLabel("CARGOS")
        .setStyle(3)

        const row = new ActionRowBuilder<any>()
        .addComponents(bBan,bUnBan,bAdv,bNtf,bCg)

        await msg.channel!.send({components:[row]})
        if (msg.type != InteractionType.ApplicationCommand){
            await msg.delete()
        }
    }
}