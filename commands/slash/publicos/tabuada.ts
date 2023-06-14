import { 
    SlashCommandBuilder,
    EmbedBuilder,
    range,
    ChatInputCommandInteraction, 
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
    async execute(interaction: ChatInputCommandInteraction) {

      const valor: any = interaction.options.get("numero")!["value"]

      if (valor <= 0) { return await interaction.reply({content: "O numero precisa ser maior que 0", ephemeral: true})}


      const e = new EmbedBuilder()
                .setTitle("testee")

  
      let x = 0

      for (const i of range({ start: valor, end: valor*11, step: valor })){
        x++
        e.addFields({name: `${interaction.options.get("numero")!["value"]} x ${x}`, value: `${i}`})
      }

      await interaction.reply({embeds: [e], ephemeral: true})

	},
}