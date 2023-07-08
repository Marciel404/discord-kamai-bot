import { ChatInputCommandInteraction, Collection, InteractionType, Message, SlashCommandBuilder } from "discord.js";
import { add_money, memberManegements, setCoolDown } from "../../db/moderation";
import moment from "moment-timezone";

const cooldowns: Collection<string, any> = new Collection()

export = {
    data: new SlashCommandBuilder()
    .setName("rolar")
    .setDescription("Role o dado de 1000 lados e tente a sorte")
    .setDMPermission(false),
    name: "rolar",
    aliases: ["dice", "dado", "dados", "dices"],
    description: "Role o dado de 1000 lados e tente a sorte",
    async execute(msg: Message | ChatInputCommandInteraction){

        const tier5 = 990
        const tier4 = 950
        const tier3 = 800
        const tier2 = 500
        const tier1 = 0
        let timestampc;
        let member;

        if (msg.type != InteractionType.ApplicationCommand){

            member = msg.author

        } else {

            member = msg.user

        };

        try {

            timestampc = cooldowns.get(member.id).timestamp;

        } catch {

            try {

                const cooldowndb = await memberManegements.findOne({_id: member.id});

                if (cooldowndb["cooldownRow"] != undefined) {

                    cooldowns.set(`${member.id}`, {timestamp: cooldowndb["cooldownRow"], vezes: 4});

                    timestampc = cooldowns.get(`${member.id}`).timestamp;

                } else {
                    cooldowns.set(member.id, {timestamp: moment(msg.createdTimestamp).tz("America/Sao_Paulo").unix()*1000, vezes: 4});

                    timestampc = cooldowns.get(member.id).timestamp;

                }

            } catch (err) {

                cooldowns.set(member.id, {timestamp: moment(msg.createdTimestamp).tz("America/Sao_Paulo").unix()*1000, vezes: 4});

                timestampc = cooldowns.get(member.id).timestamp;

            }

        };

        const date1 = moment(new Date()).tz("America/Sao_Paulo")

        const date2 = moment(timestampc).tz("America/Sao_Paulo")

        const count = cooldowns.get(`${member.id}`).vezes

        if (date1.date()-date2.date() == 0 && date1.hour()-date2.hour() >=0 || date1.date()-date2.date() >= 1){

            const value = parseInt(`${Math.random()*1000}`)

            let emb: any;

            const img = "https://media1.giphy.com/media/1OQCVjUPg67Jx4gI6J/giphy.gif?cid=790b76115ed1e1727f975fea0559d5af16b7221f6c4a0204&rid=giphy.gif&ct=s"

            if (count > 0){
                
                if (value >= tier5){

                    await add_money(member, 2000)

                    emb = {

                        title: `${value}🎲  ${count-1} dados restantes`,
                        description: "Você ganhou 2000 kamaicoins",
                        thumbnail:{
                            url: img
                        }

                    }

                } else if (value >= tier4){

                    await add_money(member, 1000)

                    emb = {

                        title: `${value}🎲  ${count-1} dados restantes`,
                        description: "Você ganhou 1000 kamaicoins",
                        thumbnail:{
                            url: img
                        }

                    }
                    
                } else if (value >= tier3){

                    await add_money(member,200)

                    emb = {

                        title: `${value}🎲  ${count-1} dados restantes`,
                        description: "Você ganhou 200 kamaicoins",
                        thumbnail:{
                            url: img
                        }

                    }
                    
                } else if (value >= tier2){

                    await add_money(member, 100)

                    emb = {

                        title: `${value}🎲  ${count-1} dados restantes`,
                        description: "Você ganhou 100 kamaicoins",
                        thumbnail:{
                            url: img
                        }

                    }
                    
                } else if (value >= tier1){

                    await add_money(member, 30)

                    emb = {

                        title: `${value}🎲  ${count-1} dados restantes`,
                        description: "Você ganhou 30 kamaicoins",
                        thumbnail:{
                            url: img
                        }

                    }

                };

                cooldowns.set(`${member.id}`, {timestamp: msg.createdTimestamp, vezes: count-1})

                await msg.reply({embeds: [emb], ephemeral: true})

                if (count == 1){
                    await setCoolDown(member,"cooldownRow", moment(msg.createdTimestamp).add(4, "hours").tz("America/Sao_Paulo").unix()*1000)
                }

            } else {

                await setCoolDown(member,"cooldownRow", moment(msg.createdTimestamp).add(4, "hours").tz("America/Sao_Paulo").unix()*1000)

                cooldowns.set(`${member.id}`, {timestamp: moment(msg.createdTimestamp).add(4, "hours").tz("America/Sao_Paulo").unix()*1000, vezes: 4})

                await msg.reply(
                    {
                        content: `Você só pode utilizar esse comando em ${moment(cooldowns.get(`${member.id}`).timestamp).tz("America/Sao_Paulo").toDate()}`,
                        ephemeral: true
                    }
                )

            }

        } else {

            await msg.reply(
                {
                    content: `Você só pode utilizar esse comando em ${moment(cooldowns.get(`${member.id}`).timestamp).tz("America/Sao_Paulo").format()}`,
                    ephemeral: true
                }
            )

        }
    }
}