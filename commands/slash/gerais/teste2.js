const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("teste2")
    .setDescription("Teste2"),
    async execute(interaction) {

        e = new EmbedBuilder()
        .setTitle("Avatar de " + interaction.user.username)
        .setImage("https://cdn.discordapp.com/avatars/"+interaction.user.id+"/"+interaction.user.avatar+".jpeg?size=2048")
		await interaction.reply({embeds: [e]});
	},
}