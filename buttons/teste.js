module.exports = {
    async execute(interaction) {
        await interaction.reply({content: "Botão apertado", ephemeral: true})
    }
}