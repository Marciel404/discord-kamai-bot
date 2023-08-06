import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder } from "discord.js"
import { configData } from "../..";
import { verifyRolesPermissions, verifyUserId } from "../../funcsSuporte/verifys";
import actStaff from "../../utils/dbActStaff";

const roles: Array<string> = [
    configData["roles"]["staff"]["asmodeus"],
    configData["roles"]["staff"]["astaroth"],
    configData["roles"]["staff"]["ormenus"],
    configData["roles"]["staff"]["acacus"]
]

export = {
    data: new SlashCommandBuilder()
        .setName("veractivitystaff")
        .setDescription("Mostra a ultima aparição dos membros da staff constada pelo bot")
        .setDMPermission(false),
    name: "veractivitystaff",
    aliases: ["vacts", "vas"],
    roles: [
        configData["roles"]["staff"]["asmodeus"],
    ],
    description: "Mostra a ultima aparição dos membros da staff constada pelo bot",
    async execute(msg: Message | ChatInputCommandInteraction) {

        if (!msg.guild) return

        if (!verifyRolesPermissions(msg.member!, this.roles) || !verifyUserId(msg.member!.user,["485801281621852175"])) return

        if (msg.type == InteractionType.ApplicationCommand){
            msg.deferReply({ephemeral: true})
        }

        const membersStaff = (await msg.guild?.members.fetch()).filter(m => verifyRolesPermissions(m,roles))

        const e = await actStaff.embedData(membersStaff)

        if (msg.type == InteractionType.ApplicationCommand){
            msg.followUp({embeds:[e],ephemeral: true})
        } else {
            msg.reply({embeds:[e]})
        }

    }
}