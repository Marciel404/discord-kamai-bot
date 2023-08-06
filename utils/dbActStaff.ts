var options = {
    db_name: "dbActivityStaff",
}
import { EmbedBuilder, GuildChannel, GuildMember, Presence, VoiceState } from "discord.js";
import moment from "moment-timezone";
import { JsonDB, Config } from "node-json-db";

class actStaff {

    dbACT: JsonDB = new JsonDB(new Config(options.db_name, true, true))

    async adcActMessage(staff: GuildMember, ChannelId: string){

        if (await this.dbACT.exists(`/${staff.id}/message/qnt`)){
            await this.dbACT.push(`/${staff.id}/message/qnt`, parseInt(await this.dbACT.getData(`/${staff.id}/message/qnt`))+1, true)
        } else {
            await this.dbACT.push(`/${staff.id}/message/qnt`, 1, true)
        }

        if (await this.dbACT.exists(`/${staff.id}/message/last`)){
            if (
                moment(await this.dbACT.getData(`/${staff.id}/message/last`)).tz("America/Sao_Paulo").month() != 
                moment(new Date()).tz("America/Sao_Paulo").month()
            ){
                await this.dbACT.push(`/${staff.id}/message/qnt`, 1, true)
            }
        }

        await this.dbACT.push(`/${staff.id}/message/last`, moment(new Date()).tz("America/Sao_Paulo").unix()*1000, true)
        await this.dbACT.push(`/${staff.id}/message/channelId`, ChannelId, true)

    }

    async adcActPresence(staff: GuildMember, oldPresence: Presence, newPresence: Presence){

        if (oldPresence?.status === newPresence?.status) return

        await this.dbACT.push(`/${staff.id}/presence/oldPresence`,oldPresence.status, true)
        await this.dbACT.push(`/${staff.id}/presence/newPresence`,newPresence.status, true)
        await this.dbACT.push(`/${staff.id}/presence/dateChanged`,moment(new Date()).tz("America/Sao_Paulo").unix()*1000, true)

    }

    async adcActVoice(staff: GuildMember, oldState: VoiceState, newState: VoiceState){

        if (!oldState.channel){
            await this.dbACT.push(`/${staff.id}/voice/lastJoinChannel`,newState.channelId, true)
            await this.dbACT.push(`/${staff.id}/voice/lastJoin`,moment(new Date()).tz("America/Sao_Paulo").unix()*1000, true)
        } else if (!newState.channel){
            await this.dbACT.push(`/${staff.id}/voice/lastLeftChannel`,oldState.channelId, true)
            await this.dbACT.push(`/${staff.id}/voice/lastLeft`,moment(new Date()).tz("America/Sao_Paulo").unix()*1000, true)
        } else if (oldState.channel && newState.channel){
            await this.dbACT.push(`/${staff.id}/voice/lastJoinChannel`,newState.channelId, true)
            await this.dbACT.push(`/${staff.id}/voice/lastJoin`,moment(new Date()).tz("America/Sao_Paulo").unix()*1000, true)
            await this.dbACT.push(`/${staff.id}/voice/lastLeftChannel`,oldState.channelId, true)
            await this.dbACT.push(`/${staff.id}/voice/lastLeft`,moment(new Date()).tz("America/Sao_Paulo").unix()*1000, true)
        }
    }

    async embedData(users: any){

        const e = new EmbedBuilder()
        .setTitle("Registros de atividade")
        let user: any;
        let infos: string = ""

        for (const i of users){
            if (await this.dbACT.exists(`/${i[0]}`)){
                user = i[1].displayName
                infos = ""
                if (await this.dbACT.exists(`/${i[0]}/message/last`)){
                    infos += `**Mensagens**\n- Ultima mensagem em ${moment(await this.dbACT.getData(`/${i[0]}/message/last`)).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm")}\n- No canal: <#${await this.dbACT.getData(`/${i[0]}/message/channelId`)}>\n- Qnt de msg no mes da ultima aparição: ${await this.dbACT.getData(`/${i[0]}/message/qnt`)}\n`
                }
                if (await this.dbACT.exists(`/${i[0]}/presence`)){
                    infos += `**Presence**\n- Antes: ${await this.dbACT.getData(`/${i[0]}/presence/oldPresence`)}\n- Depois: ${await this.dbACT.getData(`/${i[0]}/presence/newPresence`)}\n- Data de modificação: ${moment(await this.dbACT.getData(`/${i[0]}/presence/dateChanged`)).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm")}\n`
                }
                if (await this.dbACT.exists(`/${i[0]}/voice`)){
                    if (await this.dbACT.exists(`/${i[0]}/voice/lastJoin`)){
                        infos += `**Call Join**\n- Ultima call que entrou: <#${await this.dbACT.getData(`/${i[0]}/voice/lastJoinChannel`)}>\n- Data que entrou: ${moment(await this.dbACT.getData(`/${i[0]}/voice/lastJoin`)).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm")}\n`
                    }
                    if (await this.dbACT.exists(`/${i[0]}/voice/lastLeft`)){
                        infos += `**Call Left**\n- Ultima call que saiu: <#${await this.dbACT.getData(`/${i[0]}/voice/lastLeftChannel`)}>\n- Data que saiu: ${moment(await this.dbACT.getData(`/${i[0]}/voice/lastLeft`)).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm")}\n`
                    }
                }
                e.addFields({name:`${user}`, value: infos})
            }
        }

        return e
    }

}

export = new actStaff()