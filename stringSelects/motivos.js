const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders")
const configData = require(`../utils/config${process.env.bot}`)

const reason = {
    "1": "Flood/spam",
    "2": "Divulgação inadequada",
    "3": "Off topic/mensagem fora de tópico",
    "4": "Menção desnecessária de membros e cargos",
    "5": "Provocação e brigas",
    "6": "Poluição sonora",
    "7": "Atrapalhar o andamento do Karaokê",
    "8": "Denúncias falsas",
    "9": "Linguagem discriminatória",
    "10": "Exposição de membros/ Assédio",
    "11": "Preconceito, discriminação, difamação e/ou desrespeito",
    "12": "Planejar ou exercer raids no servidor",
    "13": "NSFW/ (+18)",
    "14": "Estimular ou praticar atividades ilegais ou que cause banimento de membros",
    "15": "Evasão de punição",
    "16": "Conteúdos graficamente chocantes",
    "17": "Quebra do ToS do Discord",
    "18": "Selfbot",
    "19": "Scam"
}

module.exports = {
    async execute (interaction){
        const embed = new EmbedBuilder()
        .setTitle(interaction.message.embeds[0].title)
        .setDescription(interaction.message.embeds[0].description)
        .addFields([{name: "Motivo", value: reason[interaction.values]}])
        .setFooter({text: interaction.message.embeds[0].footer.text})

        const confirmBan = new ButtonBuilder()
        .setCustomId("confirmBan")
        .setLabel("✔")
        .setStyle(4)

        const denyBan = new ButtonBuilder()
        .setCustomId("denyBan")
        .setLabel("❌")
        .setStyle(4)

        const row = new ActionRowBuilder()
        .addComponents(confirmBan, denyBan)

        await interaction.update({content: "Foi", embeds: [], components: []})

        await interaction.channel.send({embeds: [embed], components:[row]})
    }   
}