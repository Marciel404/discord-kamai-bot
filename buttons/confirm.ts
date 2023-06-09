import { ButtonInteraction, EmbedBuilder } from "discord.js";
import { verifyRoles } from "../funcsSuporte/verifys";
import { client, configData } from "../utils/loader";
import moment from "moment";
import { RegsAtivos, adcAdvertencia } from "../db/moderation";
import { msgDelete } from "../funcsSuporte/messages";
import { functionAdvRoles } from "../funcsSuporte/satff";

const roles: Array<any> = [
    configData["roles"]["staff"]["asmodeus"],
    configData["roles"]["staff"]["astaroth"]
]

export async function execute(interaction: ButtonInteraction) {

    if (!verifyRoles(interaction, roles)) return await interaction.reply({content: "Sem permissão"});

    const time = new Date()
    const dt = new Date().setHours(time.getHours()-3)

    let eR = new EmbedBuilder()
    .setThumbnail(interaction.guild!.iconURL())
    
    switch (interaction.message!.embeds[0].title){

        case "Banimento":

            eR.setTitle("Banimento")
            eR.setColor(0xed4245)
        
            for (const m of interaction.message.embeds[0].description!.split("\n")){
        
                let user = await client.users.fetch(m.split(" ")[m.split(" ").length-1].replace(/[<@>]/g, ""))
                const author = await interaction.guild!.members.fetch(interaction.message.embeds[0].footer!.text)
                const aprovador = interaction.member
                const reason = interaction.message.embeds[0].fields[0].value
        
                try {
        
                    try {
                        eR.setFields(
                            {name: "Banido por", value: `${author.user.username}`,inline: false},
                            {name: "Aprovador por", value: `${aprovador!.user.username}`, inline: false},
                            {name: "Motivo", value: `${reason}`, inline: false},
                            {name:"Data", value: `${(moment(new Date(dt))).format("DD/MM/YYYY HH:mm")}`, inline: false}
                        )
                        await user.send({embeds: [eR]})
                    } catch (err) {
                    }
        
                    eR.setFields(
                        {name: "Membro Banido", value: `${user.username}`, inline: false},
                        {name: "Banido por", value: `${author}`,inline: false},
                        {name: "Aprovador por", value: `${aprovador}`, inline: false},
                        {name: "Motivo", value: `${reason}`, inline: false},
                        {name:"Data", value: `${(moment(new Date(dt))).format("DD/MM/YYYY HH:mm")}`, inline: false}
                    )
                    await interaction.guild!.bans.create(
                    user.id,
                        {
                            reason: reason,
                            deleteMessageSeconds: 604800
                        });
                    const channel: any = await interaction.guild!.channels.fetch(configData["channels"]["modlog"])
                    await channel.send({
                        embeds: [eR]
                    })
                } catch (err) {
                    let msg = await interaction.channel!.send({content: `Não conseguir banir o membro ${user.username}`});
                    msgDelete(msg,3000)
                };
            }

            msgDelete(interaction.message,0)
            return RegsAtivos(-1)

        case "Advertencia":

            eR.setTitle("Advertencia")
            eR.setColor(0xfee75c);

            for (const m of interaction.message.embeds[0].description!.split("\n")){

                let member = await interaction.guild!.members.fetch(m.split(" ")[m.split(" ").length-1].replace(/[<@>]/g, ""));
                const author = await interaction.guild!.members.fetch(interaction.message.embeds[0].footer!.text);
                const aprovador = interaction.member;
                const reason = interaction.message.embeds[0].fields[0].value;

                try {
                    let vrf = await functionAdvRoles(member, author, aprovador, (moment(new Date(dt))).format("DD/MM/YYYY HH:mm"));
                    if (vrf != "adv3") {

                        await adcAdvertencia(author, member,aprovador, reason, (moment(new Date(dt))).format("DD/MM/YYYY HH:mm"));

                        eR.setFields(
                            {name: "Membro advertido", value: `${member}`, inline: false},
                            {name: "Advertido por", value: `${author}`,inline: false},
                            {name: "Aprovador por", value: `${aprovador}`, inline: false},
                            {name: "Motivo", value: `${reason}`, inline: false},
                            {name:"Data", value: `${(moment(new Date(dt))).format("DD/MM/YYYY HH:mm")}`, inline: false}
                        );
                        const channel: any = await interaction.guild!.channels.fetch(configData["channels"]["modlog"]);
                        await channel.send({
                            embeds: [eR]
                        });

                    }
                } catch (err) {
                    let msg = await interaction.channel!.send({content: `Não consegui adverter o membro ${member}`});
                    msgDelete(msg,3000);
                };
            };

            msgDelete(interaction.message,0);
            return RegsAtivos(-1)

        case "Adicionar cargo":
            for (const m of interaction.message.embeds[0].description!.split("\n")){
        
                let member = await interaction.guild!.members.fetch(m.split(" ")[m.split(" ").length-1].replace(/[<@>]/g, ""));
                const role = interaction.message.embeds[0].fields[0].value.replace(/[<@&>]/g, "");
                await member.roles.add(role)

            }
            msgDelete(interaction.message,0)
            return RegsAtivos(-1)
        case "Remover cargo":
            for (const m of interaction.message.embeds[0].description!.split("\n")){
        
                let member = await interaction.guild!.members.fetch(m.split(" ")[m.split(" ").length-1].replace(/[<@>]/g, ""));
                const role = interaction.message.embeds[0].fields[0].value.replace(/[<@&>]/g, "");
                await member.roles.remove(role)

            }
            msgDelete(interaction.message,0)
            return RegsAtivos(-1)
    }
}