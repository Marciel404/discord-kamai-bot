module.exports = {
    roles: [
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["staff"]["astaroth"]
    ],
    async execute( msg ) {

        if (!verifyRoles(msg, this.roles)) return 

        
        await msg.guild.members.ban(msg.content.toLowerCase().split(" ")[1].replace(/[<@>]/gi), {reason: `${reason}`})
        await msg.reply({content: `${reason}`})
        
    }
}