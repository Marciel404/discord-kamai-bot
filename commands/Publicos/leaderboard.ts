import { ChatInputCommandInteraction, Colors, InteractionType, Message, SlashCommandBuilder } from "discord.js";
import { memberManegements } from "../../db/moderation";
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";


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

        if (!verifyRolesPermissions(msg.member!,[configData.roles.staff.staff1, configData.roles.staff.staff2]) && msg.channel?.id != configData["channels"]["commands"]) return

        if (msg.type === InteractionType.ApplicationCommand){
            await msg.deferReply({ephemeral: true})
        }

        let find = memberManegements.find({}).sort({"economy.money":-1})
        let embed: any;
        let desc = "";
        let list: String[] = [];
        let val = 0
        for await (const vars of find){
            if (vars.economy?.money){
                let user = await msg.client.users.fetch(vars._id)
                list.push(`${vars.economy.money} ${user?.username}`)
            }
        }
        for (const v of list){
            val ++
            desc += `**${list.indexOf(v)+1} => [ <a:kamaicoins:1127356930797613086> ${v.split(" ")[0]}] ${v.split(" ")[1]}**\n`
            if (val == 10){
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

        if (msg.type === InteractionType.ApplicationCommand){
            await msg.followUp({embeds: [embed]})
        } else {
            await msg.reply({embeds: [embed]})
        }
        
    }
}