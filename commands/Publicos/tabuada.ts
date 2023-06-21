import { 
    SlashCommandBuilder,
    EmbedBuilder,
    range,
    ChatInputCommandInteraction,
    Message,
    InteractionType,
  }  from "discord.js";

export = {
    data: new SlashCommandBuilder()
    .setName("tabuada")
    .setDescription("Teste1")
    .addIntegerOption((option) => 
      option
        .setName("numero")
        .setDescription("Teste")
        .setRequired(true)
    ),
    name: "tabuada",
    description: "Envia a tabuada de um numero até 10",
    aliases: [],
    async execute(arg: Message | ChatInputCommandInteraction) {

      let valor = 0;
      if (arg.type != InteractionType.ApplicationCommand){
        if (!arg.content.split(" ")[1]?.match(/[0-9]/)) return await arg.reply({content: "argumento valor necessario"})
        valor = parseInt(arg.content.split(" ")[1])
      } else {
        valor = arg.options.getNumber("numero")!
      }

      if (valor <= 0) { return await arg.reply({content: "O numero precisa ser maior que 0", ephemeral: true})}


      const e = new EmbedBuilder()
  
      let x = 0

      for (const i of range({ start: valor, end: valor*11, step: valor })){
        x++
        e.addFields({name: `${valor} x ${x}`, value: `${i}`})
      }

      await arg.reply({embeds: [e], ephemeral: true})

	},
}