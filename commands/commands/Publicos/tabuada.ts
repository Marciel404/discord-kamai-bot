import { 
    SlashCommandBuilder,
    EmbedBuilder,
    range,
    ChatInputCommandInteraction,
    Message,
    InteractionType,
  }  from "discord.js";
import { configData } from "../..";
import { verifyRolesPermissions } from "../../funcsSuporte/verifys";

export = {
    data: new SlashCommandBuilder()
    .setName("tabuada")
    .setDescription("Teste1")
    .addIntegerOption((option) => 
      option
        .setName("numero")
        .setDescription("Teste")
        .setRequired(true)
    )
    .setDMPermission(false),
    name: "tabuada",
    description: "Envia a tabuada de um numero até 10",
    aliases: [],
    async execute(msg: Message | ChatInputCommandInteraction) {

      if (!verifyRolesPermissions(msg.member!,[configData.roles.staff.staff1, configData.roles.staff.staff2]) && msg.channel?.id != configData["channels"]["commands"]) return

      let valor = 0;
      if (msg.type != InteractionType.ApplicationCommand){
        if (!msg.content.split(" ")[1]?.match(/[0-9]/)) return await msg.reply({content: "argumento valor necessario"})
        valor = parseInt(msg.content.split(" ")[1])
      } else {
        valor = msg.options.getNumber("numero")!
      }

      if (valor <= 0) { return await msg.reply({content: "O numero precisa ser maior que 0", ephemeral: true})}


      const e = new EmbedBuilder()
  
      let x = 0

      for (const i of range({ start: valor, end: valor*11, step: valor })){
        x++
        e.addFields({name: `${valor} x ${x}`, value: `${i}`})
      }

      await msg.reply({embeds: [e], ephemeral: true})

	},
}