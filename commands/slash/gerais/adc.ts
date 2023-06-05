import { 
    SlashCommandBuilder,
    ChannelType,
    EmbedBuilder,
    range,
    ChatInputCommandInteraction, 
    SlashCommandStringOption,
    Options
  }  from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
    .setName("abcquant")
    .setDescription("Teste1")
    .addIntegerOption((option) => 
      option
        .setName("numero")
        .setDescription("Teste")
        .setRequired(true)
    ),
    async execute(interaction: ChatInputCommandInteraction) {

      // if (interaction.options.getChannel("channel") == null || interaction.options.getChannel("channel").type != ChannelType.GuildText) {
      //   return await interaction.reply(
      //     {
      //       content: "Você precisa digitar um canal valido",
      //       ephemeral: true
      //     }
      //   )
      // }

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