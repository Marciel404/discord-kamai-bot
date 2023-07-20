import { Message, SlashCommandBuilder, SlashCommandSubcommandGroupBuilder } from "discord.js"
import { configData } from "../..";
import logger from "../../logger";
import { addReaction } from "../../funcsSuporte/messages";

export = {
    name: "teste",
    aliases: [],
    description: "",
    async execute (msg: Message ) {

        if (!msg.guild) return

        const msg2 = await msg.reply({content: "GEsge"})

        await addReaction(msg2, ["👩", "🐍"])

    }
}