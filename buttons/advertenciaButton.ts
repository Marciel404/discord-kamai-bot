import { ButtonInteraction, GuildMember } from "discord.js";
import { adcAdvertencia } from "../db/moderation";

export async function execute(interaction: ButtonInteraction){
    const teste = interaction.member

    adcAdvertencia(teste,teste,teste,"dfsf1231", "rdg123")
}