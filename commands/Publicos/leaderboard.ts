import { ChatInputCommandInteraction, Colors, Message, SlashCommandBuilder } from "discord.js";
import { memberManegements } from "../../db/moderation";


export = {
    data: new SlashCommandBuilder()
    .setName("placar")
    .setDescription("Exibe o placar de cada categoria")
    .addStringOption((option) => 
        option
            .setName("categoria")
            .setDescription("Categoria a verificar")
            .addChoices(
                {name:"kamaicoins", value:"money"}
            )
    )
    .setDMPermission(false),
    name: "placar",
    aliases: ["lb", "pl", "leaderboard"],
    description: "Exibe o placar de cada categoria",
    async execute(msg: Message | ChatInputCommandInteraction){
        let find = await memberManegements.find({}).toArray()
        let embed: any;
        let desc = "";
        let list: String[] = [];
        for (const vars of find){
            if (vars.economy?.money){
                let user = await msg.guild?.members.fetch(vars._id)
                list.push(`${vars.economy.money} ${user?.displayName}`)
            }
        }
        for (const v of list.sort().reverse()){
            let v1 = v.split(" ")
            desc += `**${list.sort().reverse().indexOf(v)+1} => [ <a:kamaicoins:1127356930797613086> ${v1[0]}] ${v1[1]}**\n`
            if (desc.length == 10){
                embed = {
                    title: "**Placar de KamaiCoins**",
                    description: desc,
                    color: Colors.Blurple
                }
            } else if (list.length < 10){
                embed = {
                    title: "**Placar de KamaiCoins**",
                    description: desc,
                    color: Colors.Blurple
                }
            }
        }

        await msg.reply({embeds: [embed], ephemeral: true})
    }
}