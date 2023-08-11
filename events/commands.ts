import { Message } from "discord.js";
import { configData } from "..";
import { CommandsPrefix } from "../utils/Loaders";
import { client } from "../utils/index";
import logger from "../logger";

//Commands prefix Administrator
client.on("messageCreate", async (msg: Message) => {

	if (!msg.content.startsWith(configData.prefix) || msg.author.bot || !msg.guild) return;
	const commandName: string =  msg.content.toLowerCase().split(" ")[0].substring(configData.prefix.length);
	if (commandName.length == 0) return;

	try {
		CommandsPrefix("./commands", commandName, msg)
	} catch (err) {
		logger.error(err)
	};
});