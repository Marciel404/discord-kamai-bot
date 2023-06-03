module.exports = {
    name: "say",
    description: "Envia uma mensagem",
    async execute(msg) {

        if (!msg.content.toLowerCase().split(" ")[1]) return await msg.reply({content: "Argumento canal necessario"})
        if (!msg.content.toLowerCase().split(" ")[2]) return await msg.reply({content: "Argumento canal mensagem"})

        const channelId = msg.content.toLowerCase().split(" ")[1].replace(/[<#>]/gi,"")
        let args = ""

        for (const p of msg.content.split(" ")) {
            if (p != msg.content.split(" ")[0] && p != msg.content.split(" ")[1]) {
                args += `${p} `
            }
        }

        msg.guild.channels.fetch(channelId)
        .then( async (channel) => {
        await channel.send({
            content: args,
        });
        await msg.reply({content: "Mensagem enviada com sucesso"})
        })
        .catch ( async (err) => {
        return await msg.reply({content: `Não encontrei o canal ${channelId}`});
        });
    },
}