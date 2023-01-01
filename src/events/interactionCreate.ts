import { BaseInteraction } from 'discord.js';
import Bot from '../Bot';
import Event from '../util/structures/Event';
import Interaction from '../util/structures/Interaction';
import SlashCommand from '../util/structures/SlashCommand';

class InteractionEvent extends Event {
    constructor() {
        super({
            name: 'interactionCreate',
        })
    }

    private errorReply(client:Bot, message: string) {
        return {
            embeds: [client.embed({
                    type: 'error',
                    text: message
                })],
            ephemeral: true, 
        }
    }

    private async executeInteraction(client:Bot, interaction: Interaction | SlashCommand, baseInteraction: any) {
        try {
            await interaction.run(client, baseInteraction);
        } catch (error) {
            if (!baseInteraction.replied) baseInteraction.reply(this.errorReply(client, `Oops! Something went wrong!\n\`\`\`js\n${error}\`\`\``));  
        }
    }
    
    async run(client: Bot, interaction: BaseInteraction) {
        if (interaction.user.id === interaction.client.user?.id || interaction.user.bot) return;

        if (interaction.isChatInputCommand()) {
            const slashCommand = client.slashCommands.get(interaction.commandName);
            if (!slashCommand) return interaction.reply(this.errorReply(client, 'Oops! Command does not exist!'));

            if (slashCommand.category === 'splitgate' && !client.splitgate.authorized)
             return interaction.reply(this.errorReply(client, 'Oops! The bot owner has not logged in on Splitgate yet!'));

            if (slashCommand.category === 'owner' && !client.config.dev.ids.includes(interaction.user.id))
             return interaction.reply(this.errorReply(client, 'Oops! You are not the bot owner!'));

            return this.executeInteraction(client, slashCommand, interaction)
        }

        if (!interaction.isButton()) return;

        let customInteraction = client.interactions.get(interaction.customId);
        if (!customInteraction) customInteraction = client.interactions.find(button => interaction.customId.startsWith(button.customId));
        if (!customInteraction) return interaction.reply(this.errorReply(client, 'Oops! Button does not exist!'));

        if (customInteraction.authorOnly && interaction.user.id !== interaction.message.interaction?.user.id)
         return interaction.reply(this.errorReply(client, 'Oops! You shall not click other user\'s buttons!'));

        return this.executeInteraction(client, customInteraction, interaction)
    }
}

export default new InteractionEvent;