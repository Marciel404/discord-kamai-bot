import { Client, GatewayIntentBits, Options } from "discord.js";
import { loadSlash, loadEvents } from "./Loaders";
import { verifyQuestionOfDay } from "../funcsSuporte/verifys";

export const client: any = new Client({
    makeCache: Options.cacheWithLimits({ MessageManager: 5000 }),
    sweepers: {
        messages: {
            interval: 3600,
            lifetime: 1800
        },
        users: {
            interval: 3600,
            filter: () => user => user.bot && user.id !== client.user.id
        },
        presences:{
            interval: 3600,
            filter: () => user => user && user.member?.id !== client.user.id
        },
    },
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
