import { ChatInputCommandInteraction, InteractionType, Message, SlashCommandBuilder, User } from "discord.js";

export = {
    data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Envia o avatar de um membro")
    .setDMPermission(false)
    .addUserOption((option) => 
        option
            .setName("membro")
            .setDescription("Membro para ver o avatar")
    ),
    name: "avatar",
    aliases: ["profilepic"],
    async execute(msg: Message | ChatInputCommandInteraction){

        let member: any;

        if (msg.type != InteractionType.ApplicationCommand){
            if (!msg.content.split(" ")[1]){
                member = msg.author;
            } else {
                member = await msg.client.users.fetch(msg.content.split(" ")[1].replace(/[<@>]/g, ""));
            };
        } else {
            if (msg.options.getUser("membro") != null){
                member = msg.options.getUser("membro");
            } else {
                member = msg.user;
            };
        };

        await msg.reply(
            {
                embeds: [
                    {
                        title: `Avatar de ${member.username}`,
                        image: {
                            url: `${member.avatarURL({dynamic: true , format: 'png', size: 2048 })}`
                        }
                    }
                ],
                ephemeral: true
            }
        );
    }
}