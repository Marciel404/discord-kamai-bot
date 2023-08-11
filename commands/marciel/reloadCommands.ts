import { Message } from "discord.js";
import { loadCommandsSlash, loadSlash } from "../../utils/Loaders";
import { verifyUserId } from "../../funcsSuporte/verifys"

export = {
    name: "reloadslashcommands",
    description: "Reinicia os comandos do bot",
    aliases: ["rslashs"],
    async execute(msg: Message){

        if (!verifyUserId(msg.author,["485801281621852175"])) return

        loadCommandsSlash("./commands")
        await loadSlash(msg.client.application.id)
        await msg.reply({content:"Dei reload em todos os meus SlashCommands"})

    }
}