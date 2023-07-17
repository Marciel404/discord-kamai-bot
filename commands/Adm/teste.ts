import { Message } from "discord.js"
import { configData } from "../..";
import logger from "../../logger";

export = {
    name: "teste",
    aliases: [],
    description: "",
    async execute (msg: Message ) {

        if (!msg.guild) return

        await msg.guild.members.fetch(msg.content.split(" ")[1])
 
    }
}