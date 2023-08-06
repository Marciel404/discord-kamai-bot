import { APIGuildMember, Client, GuildMember, TextChannel, User } from "discord.js"
import { memberManegements } from "../db/moderation";
import { configData } from "..";
import moment from "moment-timezone";
import dbQuestions from "../utils/dbQuestions"

export function verifyUserId(user: User, Ids: Array<string>) {
    let v = false;
    for (const I of Ids) {
        if (user.id === I) {
            v = true
        };
    };
    return v
}

export function verifyRolesPermissions(member: GuildMember | APIGuildMember, roles: Array<string>) {
    let v = false;
    for (const r of roles) {
        if (Object.values(member.roles)[0]["_roles"].indexOf(r) >= 0) {
            v = true
        };
    };
    return v
}

export async function verifyAdvertenciaEntry(member: GuildMember) {

    try {

        let point = 0
        let adv = await memberManegements.findOne({ "_id": member.id })
        for (var a1 in adv) {
            if (a1 == "advertencias") {
                for (var a2 of adv[a1]) {
                    point += a2["points"]
                }
            }
        }

        const roles: Array<string> = [configData["roles"]["adv1"], configData["roles"]["adv2"], configData["roles"]["adv3"]]

        if (point == 3) {
            return await member.roles.add([roles[0], roles[1], roles[2]], "Verificação de advertencia de entrada")
        }

        if (point == 2) {
            return await member.roles.add([roles[0], roles[1]], "Verificação de advertencia de entrada")
        }

        if (point == 1) {
            return await member.roles.add(roles[0], "Verificação de advertencia de entrada")
        }

        return false

    } catch (err) {
    }
}

export async function verifyRolesEntry(member: GuildMember) {

    try {
        let doc = await memberManegements.findOne({ "_id": member.id, "roles": { "$exists": true } })

        if (doc?.roles) {
            await member.roles.add(doc["roles"],)
        } else {
        }
    } catch (err) {
    }
}

export async function verifyQuestionOfDay(client: Client) {

    const guild = await client.guilds.fetch(configData["guild"])
    const channelstaff = await guild.channels.fetch(configData["channels"]["staff"]) as TextChannel
    const channelpergunta = await guild.channels.fetch(configData["channels"]["perguntadodia"]) as TextChannel
    const channelresposta = await guild.channels.fetch(configData["channels"]["respostaperguntadodia"]) as TextChannel
    const date = moment((await channelpergunta.messages.fetch({ limit: 1 })).first()?.createdTimestamp).tz("America/Sao_Paulo").date() - moment(new Date()).tz("America/Sao_Paulo").date()

    if (date != 0) {
        const question: any = await dbQuestions.getQuestions()
        if (!question || question.length == 0) {
            if ((await channelstaff.messages.fetch({ limit: 1 })).first()?.author.id != client.user?.id) {
                await channelstaff.send({ content: `Não tem perguntas do dia cadastrada na db, ao adicionar tentarei enviar novamente em 1 hora ou se eu for reiniciado` })
            }
        } else {

            if (question.length - 1 <= 5) {
                if (question.length - 1 == 0) {
                    await channelstaff.send({ content: `Acabou todas as perguntas do dia salva na db, ao adicionar tentarei enviar novamente em 1 hora ou se eu for reiniciado` })
                } else {
                    await channelstaff.send({ content: `As perguntas do dia estão acabando e atualmente tem ${question.length - 1} pergunta(s)` })
                }
            }

            await channelpergunta!.send({ content: `${question[0]}` })
            await channelresposta!.send({ content: `https://cdn.discordapp.com/attachments/817597687934746624/1125579465439838208/ACASCUS-1-1-1-2-1-2-1-1-1-2-1-1-1-1.png` })
            await dbQuestions.deleteQuestion(question[0])
        }
    }
    setTimeout(async () => await verifyQuestionOfDay(client), 3.6e6)
}