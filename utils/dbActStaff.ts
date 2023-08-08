var options = {
    db_name: "dbActivityStaff",
}
import { EmbedBuilder, GuildMember, Presence, VoiceState } from "discord.js";
import moment from "moment-timezone";
import { JsonDB, Config } from "node-json-db";

class actStaff {

    dbACT: JsonDB = new JsonDB(new Config(options.db_name, true, true))

    async adcActMessage(staff: GuildMember, ChannelId: string){

        if (await this.dbACT.exists(`/${staff.id}/message/qnt`)){
            const qnt = await this.dbACT.getObject(`/${staff.id}/message/qnt`)
            await this.dbACT.push(`/${staff.id}/message/qnt`, parseInt(`${qnt}`)+1, true)
        } else {
            await this.dbACT.push(`/${staff.id}/message/qnt`, 1, true)
        }

        if (await this.dbACT.exists(`/${staff.id}/message/last`)){
            const lastTime = await this.dbACT.getObject(`/${staff.id}/message/last`)
            if (
                moment(lastTime!).tz("America/Sao_Paulo").month() != 
                moment(new Date()).tz("America/Sao_Paulo").month()
            ){
                await this.dbACT.push(`/${staff.id}/message/qnt`, 1, true)
            }
        }

        await this.dbACT.push(`/${staff.id}/message/last`, moment(new Date()).tz("America/Sao_Paulo").unix()*1000, true)
        await this.dbACT.push(`/${staff.id}/message/channelId`, ChannelId, true)

    }

    async adcActPresence(staff: GuildMember, oldPresence: Presence, newPresence: Presence){

        if (oldPresence?.status === newPresence?.status || !oldPresence || !newPresence) return

        await this.dbACT.push(`/${staff.id}/presence/oldPresence`,oldPresence?.status, true)
        await this.dbACT.push(`/${staff.id}/presence/newPresence`,newPresence?.status, true)
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

        await this.dbACT.load()

        const e = new EmbedBuilder()
        .setTitle("Registros de atividade")
        let user: any;
        let infos: string = ""

        for (const i of users){
            if (await this.dbACT.exists(`/${i[0]}`)){
                user = i[1].displayName
                infos = ""
                if (await this.dbACT.exists(`/${i[0]}/message/last`)){
                    const lastTime = await this.dbACT.getObject(`/${i[0]}/message/last`)
                    const channelId = await this.dbACT.getObject(`/${i[0]}/message/channelId`)
                    const qntMsg = await this.dbACT.getObject(`/${i[0]}/message/qnt`)
                    infos += `**Mensagens**\n- Ultima mensagem em ${moment((lastTime!)).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm")}\n- No canal: <#${channelId!}>\n- Qnt de msg no mes da ultima aparição: ${qntMsg!}\n`
                }
                if (await this.dbACT.exists(`/${i[0]}/presence`)){
                    const oldPresence = await this.dbACT.getObject(`/${i[0]}/presence/oldPresence`)
                    const newPresence = await this.dbACT.getObject(`/${i[0]}/presence/newPresence`)
                    const dateChanged = await this.dbACT.getObject(`/${i[0]}/presence/dateChanged`)
                    infos += `**Presence**\n- Antes: ${oldPresence!}\n- Depois: ${newPresence!}\n- Data de modificação: ${moment((dateChanged!)).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm")}\n`
                }
                if (await this.dbACT.exists(`/${i[0]}/voice`)){
                    if (await this.dbACT.exists(`/${i[0]}/voice/lastJoin`)){
                        const lastJoin = await this.dbACT.getObject(`/${i[0]}/voice/lastJoin`)
                        const lastJoinChannel = await this.dbACT.getObject(`/${i[0]}/voice/lastJoinChannel`)
                        infos += `**Call Join**\n- Ultima call que entrou: <#${lastJoinChannel!}>\n- Data que entrou: ${moment((lastJoin!)).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm")}\n`
                    }
                    if (await this.dbACT.exists(`/${i[0]}/voice/lastLeft`)){
                        const lastLeft = await this.dbACT.getObject(`/${i[0]}/voice/lastLeft`)
                        const lastLeftChannel = await this.dbACT.getObject(`/${i[0]}/voice/lastLeftChannel`)
                        infos += `**Call Left**\n- Ultima call que saiu: <#${lastLeftChannel!}>\n- Data que saiu: ${moment((lastLeft!)).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm")}\n`
                    }
                }
                e.addFields({name:`${user}`, value: infos})
            }
        }

        return e
    }

}

export = new actStaff()