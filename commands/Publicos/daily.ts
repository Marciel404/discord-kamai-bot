import { ChatInputCommandInteraction, Collection, InteractionType, Message, SlashCommandBuilder } from "discord.js";
import { daily_set, getDailyVal, memberManegements, setCoolDown } from "../../db/moderation";
import moment from "moment-timezone";
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";

const cooldowns: Collection<string, any> = new Collection()

export = {
    data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Use o comando 1x ao dia para ganhar kamaicoins")
    .setDMPermission(false),
    name: "daily",
    aliases: ["diario"],
    description: "Use o comando 1x ao dia para ganhar kamaicoins",
    async execute(msg: Message | ChatInputCommandInteraction){

        let timestampc;

        if (!verifyRolesPermissions(msg.member!,[configData.roles.staff.staff1, configData.roles.staff.staff2]) && msg.channel?.id != configData["channels"]["commands"]) return

        let member;

        if (msg.type != InteractionType.ApplicationCommand){

            member = msg.author

        } else {

            member = msg.user

        };

        try {

            timestampc = cooldowns.get(`${member.id}`).timestamp;

        } catch {

            try {

                const cooldowndb = await memberManegements.findOne({_id: member.id});

                if (cooldowndb["cooldownDaily"] != undefined) {

                    cooldowns.set(`${member.id}`, {timestamp: cooldowndb["cooldownDaily"]});

                    timestampc = cooldowns.get(`${member.id}`).timestamp;

                } else {

                    cooldowns.set(`${member.id}`, {timestamp: moment(msg.createdTimestamp).tz("America/Sao_Paulo").unix()*1000});

                    timestampc = cooldowns.get(`${member.id}`).timestamp;

                    await setCoolDown(member, "economy.daily.last", timestampc)

                }

            } catch (err) {
                
                cooldowns.set(`${member.id}`, {timestamp: moment(msg.createdTimestamp).tz("America/Sao_Paulo").unix()*1000, vezes: 4});

                timestampc = cooldowns.get(`${member.id}`).timestamp;

                await setCoolDown(member, "economy.daily.last", timestampc)

            }

        };

        const date1 = moment(new Date()).tz("America/Sao_Paulo")

        const date2 = moment(timestampc).tz("America/Sao_Paulo")

        const cooldowndb = await memberManegements.findOne({_id: member.id});

        let emb: any;

        if (date1 >= date2){

            if (cooldowndb?.economy?.daily?.last && date1.date()-moment(cooldowndb?.economy?.daily?.last).tz("America/Sao_Paulo").date()==1){

                await daily_set(member, 1)

                const val = await memberManegements.findOne({_id: member.id})

                let seq = 1 + val.economy.daily.sequencia

                emb = {

                    title: "Daily",
                    description: `Você ganhou ${await getDailyVal(member)} kamaicoins`,
                    "footer": {
                        text: `Sequencia ${seq}`
                    }

                }

                await msg.reply({embeds:[emb], ephemeral: true})

            } else {

                await daily_set(member, 0)
                
                emb = {
                    title: "Daily",
                    description: `Você ganhou ${await getDailyVal(member)} kamaicoins`
                }

                await msg.reply({embeds: [emb], ephemeral: true})

            }

            await setCoolDown(member, "cooldownDaily", date1.add(1,"day").unix()*1000)
            await setCoolDown(member, "economy.daily.last", date1.unix()*1000)
            cooldowns.set(member.id, {timestamp: date1.add(1,"day").unix()*1000})

        } else {

            await msg.reply(
                {
                    content: `Você só pode utilizar esse comando em ${moment(cooldowns.get(`${member.id}`).timestamp).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm a")}`,
                    ephemeral: true
                }
            )

        }
    }
}