import { BaseInteraction, Client, GatewayIntentBits, Message } from "discord.js";
import { loadSlash, commandSlash, loadCommandsPrefix } from "./commandsLoader";
import { configData } from "..";

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
}));

client.on("messageCreate", async (msg: Message) => {

	if (!msg.content.startsWith(configData.prefix) || msg.author.bot || !msg.guild) return;
	const commandName: string =  msg.content.toLowerCase().split(" ")[0].substring(configData.prefix.length);
	if (commandName.length == 0) return;

	try {
		await loadCommandsPrefix("./commands/prefix", commandName, msg)
	} catch (err) {
		await msg.reply({content: `Error: ${err}`})
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
			await require(`../buttons/${interaction.customId}`).execute(interaction)
		} catch (err) {
			console.log(err)
		};

	} else if (interaction.isStringSelectMenu()){

		try{
			await require(`../stringSelects/${interaction.customId}`).execute(interaction)
		} catch (err) {
			console.log(err)
		};
	};
});