const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { verifyRoles } = require("../../../funcsSuporte/verifyRoles")
const configData = require(`../../../utils/config${process.env.bot}.json`)

module.exports = {
    name: "sendbuttonsstaff",
    aliases: ["sendbts"],
    roles: [
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["staff"]["astaroth"]
    ],
    async execute( msg ){

        if (!verifyRoles(msg,this.roles)) return

        const bBan = new ButtonBuilder()
        .setCustomId("banButton")
        .setLabel("BAN")
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

        const row = new ActionRowBuilder()
        .addComponents(bBan,bAdv,bNtf,bCg)
        msg.channel.send({components:[row]})
    }
}