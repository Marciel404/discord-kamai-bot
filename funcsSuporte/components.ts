import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js"

export function row(opts: any){

    if (opts.data.type == 3){
        let SelectMenu = new StringSelectMenuBuilder()
        .setPlaceholder(opts.data.placeholder)
        .setCustomId(opts.data.custom_id)
        .setMinValues(opts.data.min_values)
        .setMaxValues(opts.data.max_values)
        for (const i of opts.data.options){
            SelectMenu.addOptions(
                new StringSelectMenuOptionBuilder()
                .setLabel(i.label)
                .setValue(i.value)
            )
        }
        return new ActionRowBuilder<any>()
        .addComponents(SelectMenu)
    }
    
}