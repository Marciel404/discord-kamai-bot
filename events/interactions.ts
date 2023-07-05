import { BaseInteraction } from "discord.js";
import { commandSlash } from "../utils/Loaders";
import { client } from "../utils/index";

//Interactions administrator
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