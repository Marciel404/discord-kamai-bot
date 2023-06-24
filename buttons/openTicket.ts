import { ButtonInteraction } from "discord.js"


export async function execute(interaction: ButtonInteraction){
    // member = interaction.guild.get_member(int(interaction.message.embeds[0].footer.text))

    // acacus = discord.utils.get(interaction.guild.roles, id=configData["roles"]["staff"]["acacus"])

    // overwrites = {

    //     member: discord.PermissionOverwrite(read_messages=True, attach_files=True),
    //     acacus: discord.PermissionOverwrite(read_messages=True, attach_files=True),
    //     interaction.guild.default_role: discord.PermissionOverwrite(read_messages=False),

    // }

    // await interaction.channel.edit(overwrites=overwrites)

    // await interaction.message.delete()

    // e = discord.Embed(title=f'Ticket de {member} aberto 🔓')
    // e.set_footer(text=member.id)

    // try:
    //     p = await interaction.channel.webhooks()
    //     web = await selfbot.fetch_webhook(p[0].id)
    //     await web.send(embed=e, view=claim())
    // except:
    //     await interaction.channel.send(embed=e, view=claimButton())

    // e = NewFunctionsPYC.EmbedBuilder()

    // if interaction.channel.category.id == configData["categories"]["ticket_chats"]:

    //     e.add_field(name="INFO", value=f"Ticket de: {member.mention}\nAção: Aberto", inline=False)
    //     e.add_field(name="Tipo", value=f"Problemas em Chats")
    //     e.set_footer(text=f"author: {interaction.user.name}", icon_url=interaction.user.display_avatar.url)
    //     e.set_color(0xE67E22)

    //     await interaction.guild.get_channel(configData["logs"]["log_create_chats"]).send(embed=e.build())

    // elif interaction.channel.category.id == configData["categories"]["ticket_calls"]:

    //     e.add_field(name="INFO", value=f"Ticket de: {member.mention}\nAção: Aberto", inline=False)
    //     e.add_field(name="Tipo", value=f"Problemas em Calls")
    //     e.set_footer(text=f"author: {interaction.user.name}", icon_url=interaction.user.display_avatar.url)
    //     e.set_color(0xE67E22)

    //     await interaction.guild.get_channel(configData["logs"]["log_create_calls"]).send(embed=e.build())

    // elif interaction.channel.category.id == configData["categories"]["ticket_privado"]:

    //     e.add_field(name="INFO", value=f"Ticket de: {member.mention}\nAção: Aberto", inline=False)
    //     e.add_field(name="Tipo", value=f"Problemas em Privado")
    //     e.set_footer(text=f"author: {interaction.user.name}", icon_url=interaction.user.display_avatar.url)
    //     e.set_color(0xE67E22)

    //     await interaction.guild.get_channel(configData["logs"]["log_create_privado"]).send(embed=e.build())

    // elif interaction.channel.category.id == configData["categories"]["ticket_outros"]:

    //     e.add_field(name="INFO", value=f"Ticket de: {member.mention}\nAção: Aberto", inline=False)
    //     e.add_field(name="Tipo", value=f"Problemas em Outros")
    //     e.set_footer(text=f"author: {interaction.user.name}", icon_url=interaction.user.display_avatar.url)
    //     e.set_color(0xE67E22)

    //     await interaction.guild.get_channel(configData["logs"]["log_create_outros"]).send(embed=e.build())
}