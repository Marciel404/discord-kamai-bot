import { BaseInteraction, Client, GatewayIntentBits, Message } from "discord.js";
import { loadSlash, commandSlash, commandPrefix } from "./commandsLoader";
import { moddb } from "../db/moderation";
import { verifyRegChannelName } from "../funcsSuporte/verifys";

export const configData = require(`./config${process.env.bot}.json`)

export const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration,
    ]
});

client.once("ready", (async (self: Client) => {
    loadSlash(self.application?.id);
    console.log("Eu entrei como " + self.user?.username);
	verifyRegChannelName(self, configData, moddb)
}));

client.on("messageCreate", async (msg: Message) => {

	if (!msg.content.startsWith(configData.prefix) || msg.author.bot || !msg.guild) return;
	const commandName: string =  msg.content.toLowerCase().split(" ")[0].substring(configData.prefix.length);
	if (commandName.length == 0) return;
	const command = commandPrefix.get(commandName);

	try {
		await command.execute(msg)
	} catch (err) {
		if (String(err).includes("Cannot read properties of undefined (reading 'execute')")){
			await msg.reply({content: `Não encontrei o comando ${commandName} nos meus comandos`})
		} else {
			await msg.reply({content: `Error: ${err}`})
		};
	};
});

client.on("interactionCreate", async (interaction: BaseInteraction) => {
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
			};
		};
	} else if (interaction.isButton()) {

		try{
			await require(`../buttons/${interaction.customId}.${process.env.lang}`).execute(interaction)
		} catch (err) {
			console.log(err)
		};

	} else if (interaction.isStringSelectMenu()){

		try{
			await require(`../stringSelects/${interaction.customId}.${process.env.lang}`).execute(interaction)
		} catch (err) {
			console.log(err)
		};
	};
});