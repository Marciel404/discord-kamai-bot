import { Colors, GuildMember, OverwriteType, PartialGuildMember, PermissionFlagsBits, TextChannel } from "discord.js";
import { client } from "../../utils";
import { configData } from "../..";

client.on("guildMemberAdd", async (member: GuildMember | PartialGuildMember)  =>{

    if (member.guild.id == configData["guildRecoveryBan"]){
        const asmodeus = member.guild.roles.cache.find(role => role.name.toLowerCase().includes("asmodeus"))!
        const astaroth = member.guild.roles.cache.find(role => role.name.toLowerCase().includes("astaroth"))!
        const ormenus = member.guild.roles.cache.find(role => role.name.toLowerCase().includes("ormenus"))!
        const acacus = member.guild.roles.cache.find(role => role.name.toLowerCase().includes("acacus"))!
        try{
            let ticket = await member.guild.channels.create(
                {
                    name: `${member.id}`,
                    permissionOverwrites: [
                        {id: member.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles], type: 1},
                        {id: member.guild.id, deny: [PermissionFlagsBits.ViewChannel], type: 0},
                        {id: asmodeus.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles], type: 0,},
                        {id: astaroth.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles], type: 0},
                        {id: ormenus.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles], type: 0, deny: [PermissionFlagsBits.SendMessages]},
                        {id: acacus.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.AttachFiles], type: 0, deny: [PermissionFlagsBits.SendMessages]},
                    ]
                }
            )
            await ticket.send({
                content: `${member}`,
                embeds:[
                    {title: "Revogação de bans",
                    color: Colors.Red, 
                    description:"\
O unico motivo para unban é a contestação da aplicação de uma punição. O ban só pode ser removido caso a punição tenha sido aplicada de uma forma inapropriada, onde o contexto da situação seja permitido nas regras do servidor. As regras se encontram em #:small_orange_diamond:regras\
\n・Não pingue a staff, aguarde a resposta\
\n\n\
Responda as seguintes indagações:\
\n\
・Quem te baniu?\n\
・Há quanto tempo foi a punição?\n\
・Qual foi o motivo da sua punição informado pelo bot?\n\
・Explique por que a punição foi aplicada de forma indevida: (esse é o seu momento, não terá outra chance! Então, jogue tudo para rolo!) \n\
・Prints são permitidos.\n\
\n\n\
Responda as seguintes indagações e aguarde a resposta de seu unban. Caso queira saber o requesito para ser desbanido, consulte o chat #:small_orange_diamond:unban-kamaitachi"
                    }
                ]
            })
    
            let channel: any = member.guild.channels.cache.find(channel => channel.type === 0 && channel.name.includes("log"))
            await channel.send({content: `👉 ${member.user.username}(${member.id}) entrou do server`})
        } catch (err) {
            console.log(err)
        }
    }
})