const {Client, GatewayIntentBits} = require("discord.js")
const { loadSlash, commandSlash, commandPrefix } = require("./commandsLoader")
const configData = require(`./config${process.env.bot}.json`)

const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]
})

client.once("ready", (self => {
    loadSlash(self.application.id);
    console.log("Eu entrei como " + self.user.username);
})),

client.on("messageCreate", async msg => {

	if (!msg.content.startsWith(configData.prefix) || msg.author.bot || !msg.guild) return;
	const commandName =  msg.content.toLowerCase().split(" ")[0].substring(configData.prefix.length);
	if (commandName.length == 0) return;
	const command = commandPrefix.get(commandName);

	try {
		await command.execute(msg)
	} catch (err) {
		if (String(err).includes("Cannot read properties of undefined (reading 'execute')")){
			await msg.reply({content: `Não encontrei o comando ${commandName} nos meus comandos aqui está sua lista de comandos`})
		} else {
			await msg.reply({content: `Error: ${err}`})
		}
	}

});

client.on("interactionCreate", async (interaction) => {
	if (interaction.isChatInputCommand()){

		const command = commandSlash.get(interaction.commandName);

		if (!command) {
			return console.error(`No command matching ${interaction.commandName} was found.`);
		};

		try {
			await command.execute(interaction);
		} catch (error) {
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: `${error}`, ephemeral: true });
			} else {
				await interaction.reply({ content: `${error}`, ephemeral: true });
			}
		};
	} else if (interaction.isButton()) {
		try{
			await require(`../buttons/${interaction.customId}.js`).execute(interaction)
		} catch (err) {
			console.log(err)
		}
	} else if (interaction.isStringSelectMenu()){
		try{
			await require(`../StringSelects/${interaction.customId}.js`).execute(interaction)
		} catch (err) {
			console.log(err)
		}
	}
});

module.exports = client