import { BaseInteraction } from "discord.js";
import { commandSlash } from "../utils/Loaders";
import { client } from "../utils/index";
import logger from "../logger";

//Interactions administrator
client.on("interactionCreate", async (interaction: BaseInteraction) => {
	if (interaction.isChatInputCommand()){

		const command = commandSlash.get(interaction.commandName);

		if (!command) {
			return console.error(`No command matching ${interaction.commandName} was found.`);
		};

		try {
			logger.usage(interaction.user, command.name)
			await command.execute(interaction);
		} catch (err) {
			if (interaction.replied || interaction.deferred) {
				logger.error(err)
			} else {
				logger.error(err)
			};
		};
	} else if (interaction.isButton()) {

		try{
			await require(`../buttons/${interaction.customId}`).execute(interaction)
		} catch (err) {
			logger.error(err)
		};

	} else if (interaction.isStringSelectMenu()){

		try{
			await require(`../stringSelects/${interaction.customId}`).execute(interaction)
		} catch (err) {
			logger.error(err)
		};

	};
});