import { Message } from "discord.js";
import { loadCommandsSlash, loadSlash } from "../../utils/Loaders";
import { verifyUserId } from "../../funcsSuporte/verifys"

export = {
    name: "reloadSlashs",
    description: "Reinicia os slashs do bot",
    aliases: ["rslash"],
    async execute(msg: Message){

        if (!verifyUserId(msg.author,["485801281621852175"])) return

        loadCommandsSlash("./commands")
        loadSlash(msg.client.application.id)
        msg.reply({content:"Dei reload em todos os slashs"})

    }
}
