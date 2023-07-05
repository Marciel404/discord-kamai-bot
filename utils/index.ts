import { Client, GatewayIntentBits, Options } from "discord.js";
import { loadSlash, loadEvents } from "./Loaders";
import { verifyQuestionOfDay } from "../funcsSuporte/verifys";

export const client: any = new Client({
    makeCache: Options.cacheWithLimits({ MessageManager: 5000 }),
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

client.once("ready", (async (self: Client) => {
    self.user?.setStatus("idle")
    loadSlash(self.application?.id);
    loadEvents("./events")
    await verifyQuestionOfDay(client)
    console.log("Eu entrei como " + self.user?.username);
}));
