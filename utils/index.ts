import { Client, GatewayIntentBits } from "discord.js";
import { loadSlash, loadEvents } from "./Loaders";

export const client = new Client({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.once("ready", (async (self: Client) => {
    self.user?.setStatus("idle")
    loadSlash(self.application?.id);
    loadEvents("./events")
    console.log("Eu entrei como " + self.user?.username);
}));