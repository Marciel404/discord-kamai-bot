const { SlashCommandBuilder } = require("discord.js");
const { addCargoReg } = require("../../../db/registro")

module.exports = {
    
    data: new SlashCommandBuilder()
    .setName("adc_cargo_reg")
    .setDescription("Adiciona um cargo aos registros")
    .addRoleOption((option) => 
        option
            .setName("cargo")
            .setDescription("Cargo Para adicionar")
            .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("name")
            .setDescription("Nome do cargo no registro")
    )
    .addStringOption((option) => 
        option
            .setName("categoria")
            .setDescription("Nome da categoria do cargo")
    ),
    async execute(interaction) {

        addCargoReg(
            interaction.guild,
            interaction.options.getRole("cargo"),
            interaction.options.getString("name"),
            interaction.options.getString("categoria")
            )
        
        await interaction.reply(
            {
                content: `Cargo ${interaction.options.getRole("cargo")} salvo como ${interaction.options.getString("name")} na categoria ${interaction.options.getString("categoria")}`,
                ephemeral : true
            }
        )

    }
}