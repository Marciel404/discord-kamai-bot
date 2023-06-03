const { verifyRoles } = require("../funcsSuporte/verifyRoles")
const configData = require(`../utils/config${process.env.bot}`)

module.exports = {
    roles: [
        configData["roles"]["staff"]["staff1"],
        configData["roles"]["staff"]["staff2"]
    ],
    async execute( msg ) {

        if (!verifyRoles(msg, this.roles)) return
        await msg.reply({content: `123`, ephemeral: true})
        
    }
}