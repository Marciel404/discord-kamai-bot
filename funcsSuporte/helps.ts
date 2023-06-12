import { Colors, Message } from "discord.js";
import fs from "node:fs"
import { configData } from "../utils/loader";

export function generateEmbedHelp(msg: Message){
    let l = ""
    let roles = Object.values(msg.member!.roles)[0]["_roles"]
    if (roles.indexOf(configData.roles.staff.asmodeus) == 0 || roles.indexOf(configData.roles.staff.astaroth) == 0){
        l += fullcommand()
    } else if (roles.indexOf(configData.roles.staff.ormenus) == 0) {

        if (l.indexOf(getModCommands()) == -1) {
            l += getModCommands();
        };
        
        if (l.indexOf(getStaffCommands()) == -1) {
            l += getStaffCommands();
        };

        if (l.indexOf(getStaffeCapsCommands()) == -1) {
            l += getStaffeCapsCommands();
        };

    } else if (roles.indexOf(configData.roles.staff.acacus) == 0) {

        if (l.indexOf(getStaffCommands()) == -1) {
            l += getStaffCommands();
        };

        if (l.indexOf(getStaffeCapsCommands()) == -1) {
            l += getStaffeCapsCommands();
        };

    } else if (
            roles.indexOf(configData.roles.capitaes_karaoke) == 0 ||
            roles.indexOf(configData.roles.capitaes_poem) == 0 ||
            roles.indexOf(configData.roles.capitaes_arte) == 0 ||
            roles.indexOf(configData.roles.capitaes_evento) == 0 
        ) {

        if (l.indexOf(getCapsCommands()) == -1) {
            l += getCapsCommands();
        };

        if (l.indexOf(getStaffeCapsCommands()) == -1) {
            l += getStaffeCapsCommands();
        };

    } else if (roles.indexOf(configData.roles.equipe_karaoke) == 0) {

        if (l.indexOf(getEligosCommands()) == -1) {
            l += getEligosCommands();
        };

    } else if (
            roles.indexOf(configData.roles.equipe_eventos) == 0 ||
            roles.indexOf(configData.roles.capitaes_eventos) == 0
        ) {

        if (l.indexOf(getEligosCommands()) == -1) {
            l += getEligosCommands();
        };

    } else if (
        roles.indexOf(configData.roles.ntb) == 0 ||
        roles.indexOf(configData.roles.nvl100) == 0 ||
        roles.indexOf(configData.roles.capitaes_arte) == 0 ||
        roles.indexOf(configData.roles.staff.staff1) == 0 ||
        roles.indexOf(configData.roles.staff.staff2) == 0 
    ) {

        if (l.indexOf(getCallPvCommands()) == -1) {
            l += getCallPvCommands();
        };

    }

    l += getPublicCommands()
    return {
        title:"Meus Comandos",
        description: l,
        color: Colors.Blurple,
        thumbnail: {
            url: `${msg.client!.user.displayAvatarURL()}`
        },
    }
}

function fullcommand() {

    let l = ""

    const modcmd = fs.readdirSync(`./commands/prefix/Adm`).filter(file => file.endsWith(`.ts`));
    modcmd.forEach(commandName =>{
        if (l.indexOf("Administração") == -1){
            l += "\n**Administração**\n"
        }
        let cmd = require(`../commands/prefix/Adm/${commandName}`)
        if (l.indexOf(`↳${cmd.name}`) == -1){
            l += `↳${cmd.name}: ${cmd.description}\n`
        }
    })

    l += getModCommands()
    l += getStaffCommands()
    l += getStaffeCapsCommands()
    l += getCapsCommands()
    l += getEligosCommands()
    l += getEquipeEventosCommands()
    l += getCallPvCommands()

    return l
}

function getModCommands() {

    let s = "";
    const modcmd = fs.readdirSync(`./commands/prefix/Mod`).filter(file => file.endsWith(`.ts`));
    modcmd.forEach(commandName =>{
        if (s.indexOf("Moderação") == -1){
            s += "\n****Moderação**\n"
        }
        let cmd = require(`../commands/prefix/Mod/${commandName}`)
        s += `↳${cmd.name}: ${cmd.description}\n`
        
    })

    return s
}


function getStaffCommands() {
    let s = "";
    const staffcmd = fs.readdirSync(`./commands/prefix/Staff`).filter(file => file.endsWith(`.ts`));
    staffcmd.forEach(commandName =>{
        if (s.indexOf("Staff") == -1){
            s += "\n**Staff**\n"
        }
        let cmd = require(`../commands/prefix/Staff/${commandName}`)
        s += `↳${cmd.name}: ${cmd.description}\n`
    })

    return s
}


function getStaffeCapsCommands() {
    let s = "";
    const scapscmd = fs.readdirSync(`./commands/prefix/staff e caps`).filter(file => file.endsWith(`.ts`));
    scapscmd.forEach(commandName =>{
        if (s.indexOf("Staff e Capitães") == -1){
            s += "\n**Staff e Captães**\n"
        }
        let cmd = require(`../commands/prefix/staff e caps/${commandName}`)
        if (s.indexOf(`↳${cmd.name}`) == -1){
            s += `↳${cmd.name}: ${cmd.description}\n`
        };
        
    })

    return s
}


function getCapsCommands() {
    let s = "";
    const capscmd = fs.readdirSync(`./commands/prefix/Caps`).filter(file => file.endsWith(`.ts`));
    capscmd.forEach(commandName =>{
        if (s.indexOf("Capitães") == -1){
            s += "\n**Capitães**\n"
        }
        let cmd = require(`../commands/prefix/mod/${commandName}`)
        if (s.indexOf(`↳${cmd.name}`) == -1){
            s += `↳${cmd.name}: ${cmd.description}\n`
        };
        
    })

    return s
}


function getEligosCommands() {
    let s = "";
    const karaokecmd = fs.readdirSync(`./commands/prefix/EquipeKaraoke`).filter(file => file.endsWith(`.ts`));
    karaokecmd.forEach(commandName =>{
        if (s.indexOf("Eligos") == -1){
            s += "\n**Eligos**\n"
        }
        let cmd = require(`../commands/prefix/EquipeKaraoke/${commandName}`)
        if (s.indexOf(`↳${cmd.name}`) == -1){
            s += `↳${cmd.name}: ${cmd.description}\n`
        };
        
    })

    return s
}


function getEquipeEventosCommands() {
    let s = "";
    const eventoscmd = fs.readdirSync(`./commands/prefix/EquipeEventos`).filter(file => file.endsWith(`.ts`));
    eventoscmd.forEach(commandName =>{
        if (s.indexOf("Gremorys") == -1){
            s += "\n**Gremorys**\n"
        }
        let cmd = require(`../commands/prefix/EquipeEventos/${commandName}`)
        if (s.indexOf(`↳${cmd.name}`) == -1){
            s += `↳${cmd.name}: ${cmd.description}\n`
        };
        
    })

    return s
}


function getCallPvCommands() {
    let s = "";
    const callpv = fs.readdirSync(`./commands/prefix/CallPv`).filter(file => file.endsWith(`.ts`));
    callpv.forEach(commandName =>{
        if (s.indexOf("CallPv") == -1){
            s += "\n**CallPv**\n"
        }
        let cmd = require(`../commands/prefix/CallPv/${commandName}`)
        if (s.indexOf(`↳${cmd.name}`) == -1){
            s += `↳${cmd.name}: ${cmd.description}\n`
        };
        
    })

    return s
};


function getPublicCommands() {
    let s = "";
    const eventoscmd = fs.readdirSync(`./commands/prefix/Publicos`).filter(file => file.endsWith(`.ts`));
    eventoscmd.forEach(commandName =>{
        if (s.indexOf("Publicos") == -1){
            s += "\n**Publicos**\n"
        };
        let cmd = require(`../commands/prefix/Publicos/${commandName}`)
        if (s.indexOf(`↳${cmd.name}`) == -1){
            s += `↳${cmd.name}: ${cmd.description}\n`
        };
        
    });

    return s
};

