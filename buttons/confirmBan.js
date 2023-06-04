const { EmbedBuilder } = require("@discordjs/builders")
const { verifyRoles } = require("../funcsSuporte/verifyRoles")
const configData = require(`../utils/config${process.env.bot}`)

module.exports = {
    roles: [
        configData["roles"]["staff"]["asmodeus"],
        configData["roles"]["staff"]["astaroth"]
    ],
    async execute( interaction ) {

        let eR = new EmbedBuilder()
        .setTitle("Banimento")

        if (!verifyRoles(interaction, this.roles)) return interaction.reply({content: "Sem permissão"})

        for (const m of interaction.message.embeds[0].description.split("\n")){

            let user = await interaction.client.users.fetch(m.replace(/[<@>]/g, ""))
            const author = await interaction.guild.members.fetch(interaction.message.embeds[0].footer.text)
            const aprovador = interaction.member
            const reason = interaction.message.embeds[0].fields[0].value

            try {

                try {
                    eR.setFields(
                        {name: "Banido por", value: `${author.user.username}`,inline: false},
                        {name: "Aprovador por", value: `${aprovador.user.username}`, inline: false},
                        {name: "Motivo", value: `${reason}`, inline: false}
                    )
                    await user.send({embeds: [eR]})
                } catch (err) {
                    console.log(err)
                }

                eR.setFields(
                    {name: "Membro Banido", value: `${user.username}`, inline: false},
                    {name: "Banido por", value: `${author}`,inline: false},
                    {name: "Aprovador por", value: `${aprovador}`, inline: false},
                    {name: "Motivo", value: `${reason}`, inline: false}
                )
                await interaction.guild.bans.create(
                    m.replace(/[<@>]/g, ""),
                    {
                        reason: reason,
                        deleteMessageSeconds: 604800
                    });
                interaction.guild.channels.fetch(configData["channels"]["modlog"])
                .then( async (channel) => {
                    await channel.send({
                        embeds: [eR],
                    });
                })
                .catch ( async (err) => {
                });
            } catch (err) {
                let msg = await interaction.channel.send({content: `Não conseguir banir o membro <@${m.replace(/[<@>]/g, "")}>`});
                setTimeout(async ()=>{
                    await msg.delete()
                }, 5000);
            };
        }

        await interaction.message.delete()
        
    }
}