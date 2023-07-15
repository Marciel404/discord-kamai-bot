import { APIGuildMember, ChatInputCommandInteraction, GuildMember, InteractionType, Message, SlashCommandBuilder } from "discord.js";
import { memberManegements } from "../../db/moderation";
import moment from "moment";

export = {
    data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Envia algumas informações de um membro")
    .addUserOption((option) => 
        option
            .setName("membro")
            .setDescription("Membro para ver as unformações")
            .setRequired(false)
    )
    .setDMPermission(false),
    name: "profile",
    description: "Envia algumas informações de um membro",
    aliases: ["ui", "info", "perfil"],
    async execute(msg: Message | ChatInputCommandInteraction){

        let member: any;
        if (msg.type === InteractionType.ApplicationCommand){
            if (msg.options.getUser("membro")){
                member = await msg.guild?.members.fetch(msg.options.getUser("membro")!.id)
            } else {
                member = msg.member
            }
        } else {
            if (!msg.content.split(" ")[1]){
                member = msg.member
            } else {
                member = await msg.guild?.members.fetch(msg.content.split(" ")[1].replace(/[<@>]/g,""))
            }
        }

        let date = new Date(Date.now()-member.joinedAt)
        let joined_duration_month = parseInt(`${date.getTime() / 2592000000}`)

        let embed = {
            title: `${member.displayName}`,
            thumbnail: {
                url: `${member.displayAvatarURL()}`
            },
            fields: [
                {
                    name: "‎",
                    value: "‎",
                    inline: false
                },
                {
                    name: "🚪Conta criada em",
                    value: `${moment(member.user.createdTimestamp).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm a")}`,
                    inline: false
                },
                {
                    name: "🛎Entrou em",
                    value: `${moment(member.joinedTimestamp).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm a")}`,
                    inline: false
                },
                {
                    name: "<a:kamaicoins:1127356930797613086> Kamaicoins",
                    value: await this.getkamaicoins(member!),
                    inline: false
                }
            ],
            color: 0x5865f2,
            footer: {
                text: `Id: ${member.id}`
            }
        }
        if (this.getbadges(joined_duration_month) != ""){
            embed.fields.push(
                {
                    name: "⭐Badges ",
                    value: `${this.getbadges(joined_duration_month)}`,
                    inline: false
                }
            )
        }
        await msg.reply({embeds: [embed], ephemeral: true})
    },
    async getkamaicoins(member: GuildMember | APIGuildMember){

        let val; 
        try {
            let kC = await memberManegements.findOne({_id: member.user?.id})
            val = (kC["economy"]["money"]) ? kC["economy"]["money"] : 0
        } catch {
            val = 0
        }
        return val
    },

    getbadges(duration: any){
        let badges: any = []

        if(duration>2)badges.push(`<:cabelos_arcoiris:1129836478680281179>`)
        if(duration>4)badges.push(`<:chifrinho:1129836540474949643>`)
        if(duration>6)badges.push(`<:julieta:1129836585123324014>`)
        if(duration>8)badges.push(`<:pendurado:1129836630761558200>`)
        if(duration>10)badges.push(`<:homem_torto:1129836675569291264>`)
        if(duration>12)badges.push(`<:jhonny:1129838151922372638>`)
    
        badges=badges.join("")
        return badges;
    }

}