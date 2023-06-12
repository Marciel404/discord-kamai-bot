import { Colors, Message } from "discord.js";
import { configData } from "../../../utils/loader";

module.exports={
    name: "open",
    aliases: ["abrir"],
    description: "Abre a sala de abaddon", 
    async execute(msg: Message){
        try {

            let channel: any = msg.guild!.channels.cache.get(configData.channels.abaddon_voice)
            if (channel.permissionsFor(msg.guild!.roles.everyone).has("Connect")){
                return await msg.reply({content: "Os portões de abaddon já estão abertos"})
            }

            let question = await msg.channel.send({embeds:[{
                image:{url:"https://media0.giphy.com/media/WFOmpGEzIFnHYAYvR2/giphy.gif?cid=790b76118c086bcc53069aaf9bba6512c50d9815cf3fc3b5&rid=giphy.gif&ct=g"},
                description:"`É um possuidor do passe?`",
                title: "Quem tenta abrir os portões?",
                color: Colors.Red
            }]})
            try{
                //if(await LocalDb.get_channel(configData.channels.abaddon_voice)["state"]) return await msg.channel.send("<#"+configData.channels.abaddon_voice+">")

                const collectorFilter = (m: Message) => m.author.id === msg.author.id
                const collector = msg.channel!.createMessageCollector({ filter: collectorFilter, max: 1, time: 100000 });

                collector.on("collect", async (message: Message) => {
                    let password = message.content
                    if(password.toLowerCase() == process.env.passwordAbaddon){
                        await question.delete()
                        open(message)
                    
                    }else{
                        throw `WrongPassword`
                        
                    }
                })

            }catch(e){
                if(e == `WrongPassword`){
                    await question.delete()
                    await msg.channel.send({embeds:[{
                        description:"A voz da sua alma ira te guiar por um caminho. Escute o seu interior",
                        title: "Você não tem noção do que diz",
                        color: Colors.Red
                    }]})
                }else{
                    await question.delete()
                    await msg.channel.send({embeds:[{
                        description:"*Até uma proxima*",
                        title: "Vejo que perdi meu tempo aqui",
                        color: Colors.Red
                    }]})
                }
            }        
        } catch (error) {
            console.log(error)
        }
    }
}

async function open(msg: Message){
    try {
        await msg.delete()

        let abaddon: any = msg.guild!.channels.cache.get(configData.channels.abaddon_voice)
        
        var welcome = await msg.channel.send({embeds:[{
            thumbnail:{url:"https://media2.giphy.com/media/6G118Ea8ppWuCAhMDw/giphy.gif?cid=790b761104af5a82e6d44948502f7b25dd42bc4e6931159d&rid=giphy.gif&ct=s"},
            image:{url:"https://i.imgur.com/dFlhEmM.png"},
            description:"`Estou fazendo os preparativos`",
            title: "Bom vê-lo por aqui!",
            color: Colors.Red
        }]})
        
        setTimeout(async()=>{
            try {
                await welcome.delete()
        
                await msg.channel.send({content:"<#"+configData.channels.abaddon_voice+">",embeds:[{
                    description:"`Irei me retirar do meu posto de guarda! Cuide por mim`",
                    title: "Seja bem vindo!",
                    color: Colors.Red
                }]})
                await abaddon!.permissionOverwrites.create(msg.guild!.id,{Connect:true})
            } catch (error) {
                console.log(error)
            }

        }, 20000)
    } catch (error) {
        console.log(error)
    }
    

}