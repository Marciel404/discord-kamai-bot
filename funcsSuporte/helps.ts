import { Colors, Message } from "discord.js";
import fs from "node:fs"
import { configData } from "..";

export function generateEmbedHelp(msg: Message){
    let l = ""
    let roles = Object.values(msg.member!.roles)[0]["_roles"]
    if (roles.indexOf(configData.roles.staff.asmodeus) >= 0 || roles.indexOf(configData.roles.staff.astaroth) >= 0){
        l += fullcommand();
    } else if (roles.indexOf(configData.roles.staff.ormenus) >= 0){

        if (l.indexOf(getModCommands()) == -1){
            l += getModCommands();
        };
        
        if (l.indexOf(getStaffCommands()) == -1){
            l += getStaffCommands();
        };

        if (l.indexOf(getStaffeCapsCommands()) == -1){
            l += getStaffeCapsCommands();
        };

    } else if (roles.indexOf(configData.roles.staff.acacus) >= 0){

        if (l.indexOf(getStaffCommands()) == -1){
            l += getStaffCommands();
        };

        if (l.indexOf(getStaffeCapsCommands()) == -1){
            l += getStaffeCapsCommands();
        };

    } else if (
            roles.indexOf(configData.roles.capitaes_karaoke) >= 0 ||
            roles.indexOf(configData.roles.capitaes_poem) >= 0 ||
            roles.indexOf(configData.roles.capitaes_arte) >= 0 ||
            roles.indexOf(configData.roles.capitaes_evento) >= 0 
        ){

        if (l.indexOf(getStaffeCapsCommands()) == -1){
            l += getStaffeCapsCommands();
        };

    } else if (roles.indexOf(configData.roles.equipe_karaoke) >= 0){

        if (l.indexOf(getEligosCommands()) == -1){
            l += getEligosCommands();
        };

    } else if (
            roles.indexOf(configData.roles.equipe_eventos) >= 0 ||
            roles.indexOf(configData.roles.capitaes_eventos) >= 0){

        if (l.indexOf(getEligosCommands()) == -1){
            l += getEligosCommands();
        };

    };

    l += getPublicCommands()
    return{
        title:"Meus Comandos",
        description: l,
        color: Colors.Blurple,
        thumbnail:{
            url: `${msg.client!.user.displayAvatarURL()}`
        },
    };
};

function fullcommand(){

    let l = ""

    const modcmd = fs.readdirSync(`./commands/Adm`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
    modcmd.forEach(commandName =>{
        if (l.indexOf("Administração") == -1){
            l += "\n**Administração**\n"
        };
        let cmd = require(`../commands/Adm/${commandName}`);
        if (l.indexOf(`- ${cmd.name}`) == -1){
            l += `- ${cmd.name}: ${cmd.description}\n`
            if (cmd.aliases.length > 0){
                l += `- - aliases: ${cmd.aliases}\n\n`
            }
        };
    });

    l += getModCommands();
    l += getStaffCommands();
    l += getStaffeCapsCommands();
    l += getEligosCommands();
    l += getEquipeEventosCommands();

    return l
};

function getModCommands(){

    let s = "";
    const modcmd = fs.readdirSync(`./commands/Mod`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
    modcmd.forEach(commandName =>{
        if (s.indexOf("Moderação") == -1){
            s += "\n**Moderação**\n"
        }
        let cmd = require(`../commands/Mod/${commandName}`)
        if (s.indexOf(`- ${cmd.name}`) == -1){
            s += `- ${cmd.name}: ${cmd.description}\n`
            if (cmd.aliases.length > 0){
                s += `- - aliases: ${cmd.aliases}\n\n`
            }
        };
        
    });

    return s
};


function getStaffCommands(){
    let s = "";
    const staffcmd = fs.readdirSync(`./commands/Staff`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
    staffcmd.forEach(commandName =>{
        if (s.indexOf("Staff") == -1){
            s += "\n**Staff**\n"
        }
        let cmd = require(`../commands/Staff/${commandName}`)
        if (s.indexOf(`- ${cmd.name}`) == -1){
            s += `- ${cmd.name}: ${cmd.description}\n`
            if (cmd.aliases.length > 0){
                s += `- - aliases: ${cmd.aliases}\n\n`
            }
        };
    });

    return s
};


function getStaffeCapsCommands(){
    let s = "";
    const scapscmd = fs.readdirSync(`./commands/Staff e Caps`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
    scapscmd.forEach(commandName =>{
        if (s.indexOf("Staff e Capitães") == -1){
            s += "\n**Staff e Captães**\n"
        }
        let cmd = require(`../commands/Staff e Caps/${commandName}`)
        if (s.indexOf(`- ${cmd.name}`) == -1){
            s += `- ${cmd.name}: ${cmd.description}\n`
            if (cmd.aliases.length > 0){
                s += `- - aliases: ${cmd.aliases}\n\n`
            }
        };
        
    });

    return s
};


function getEligosCommands(){
    let s = "";
    const karaokecmd = fs.readdirSync(`./commands/EquipeKaraoke`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
    karaokecmd.forEach(commandName =>{
        if (s.indexOf("Eligos") == -1){
            s += "\n**Eligos**\n"
        };
        let cmd = require(`../commands/EquipeKaraoke/${commandName}`)
        if (s.indexOf(`- ${cmd.name}`) == -1){
            s += `- ${cmd.name}: ${cmd.description}\n`
            if (cmd.aliases.length > 0){
                s += `- - aliases: ${cmd.aliases}\n\n`
            }
        };
        
    });

    return s
};


function getEquipeEventosCommands(){
    let s = "";
    const eventoscmd = fs.readdirSync(`./commands/EquipeEventos`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
    eventoscmd.forEach(commandName =>{
        if (s.indexOf("Gremorys") == -1){
            s += "\n**Gremorys**\n"
        }
        let cmd = require(`../commands/EquipeEventos/${commandName}`)
        if (s.indexOf(`- ${cmd.name}`) == -1){
            s += `- ${cmd.name}: ${cmd.description}\n`
            if (cmd.aliases.length > 0){
                s += `- - aliases: ${cmd.aliases}\n\n`
            }
        };
        
    })

    return s
};


function getPublicCommands(){
    let s = "";
    const eventoscmd = fs.readdirSync(`./commands/Publicos`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));
    eventoscmd.forEach(commandName =>{
        if (s.indexOf("Publicos") == -1){
            s += "\n**Publicos**\n"
        };
        let cmd = require(`../commands/Publicos/${commandName}`)
        if (s.indexOf(`- ${cmd.name}`) == -1){
            s += `- ${cmd.name}: ${cmd.description}\n`
            if (cmd.aliases.length > 0){
                s += `- - aliases: ${cmd.aliases}\n\n`
            }
        };
        
    });

    return s
};
