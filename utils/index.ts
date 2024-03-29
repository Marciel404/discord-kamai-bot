import { Client, GatewayIntentBits } from "discord.js";
import { loadSlash, loadEvents } from "./Loaders";
import { verifyQuestionOfDay } from "../funcsSuporte/verifys";
import logger from "../logger";

export const client: Client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences
    ]
});

client.once("ready", (async (self: Client) => {
    self.user?.setStatus("idle")
    loadSlash(self.application?.id);
    loadEvents("./events")
    await verifyQuestionOfDay(client)
    logger.clear()
    console.log("Eu entrei como " + self.user?.username);
}));
