import { AnySelectMenuInteraction, BaseInteraction, ButtonInteraction } from 'discord.js';
import Bot from '../Bot';
import User from '../schemas/User';
import { IUser } from '../types/User';
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

    private handleInteraction(client: Bot, interaction: ButtonInteraction | AnySelectMenuInteraction, user: IUser) {
        let customInteraction = client.interactions.get(interaction.customId);
        if (!customInteraction) customInteraction = client.interactions.find(button => interaction.customId.startsWith(button.customId));
        if (!customInteraction) return interaction.reply(this.errorReply(client, 'Oops! Button does not exist!'));

        if (customInteraction.authorOnly && interaction.user.id !== interaction.message.interaction?.user.id)
         return interaction.reply(this.errorReply(client, 'Oops! You shall not use other user\'s interactions!'));

        return this.executeInteraction(client, customInteraction, interaction, user)
    }

    private async executeInteraction(client:Bot, interaction: Interaction | SlashCommand, baseInteraction: any, user: IUser) {
        try {
            await interaction.run(client, baseInteraction, user);
        } catch (error) {
            if (!baseInteraction.replied) baseInteraction.reply(this.errorReply(client, `Oops! Something went wrong!\n\`\`\`js\n${error}\`\`\``));  
        }
    }
    
    async run(client: Bot, interaction: BaseInteraction) {
        if (interaction.user.id === interaction.client.user?.id || interaction.user.bot) return;

        const user: IUser = (await User.findById(interaction.user.id)) || { _id: interaction.user.id };

        if (interaction.isChatInputCommand()) {
            const slashCommand = client.slashCommands.get(interaction.commandName);
            if (!slashCommand) return interaction.reply(this.errorReply(client, 'Oops! Command does not exist!'));

            if (slashCommand.category === 'splitgate') {
                if (!client.splitgate.authorized)
                 return interaction.reply(this.errorReply(client, 'Oops! The bot owner has not logged in on Splitgate yet!'));
                
                if (slashCommand.options.length > 0 && slashCommand.options[0].name === 'userid') {
                    const input = interaction.options.getString('userid');
                    if (!input && !user.splitgateId)
                     return interaction.reply(this.errorReply(client, 'You must provide a user identifier or link an account via the /link command'));
                    
                     if (input) user.splitgateId = input;
                }
            }

            if (slashCommand.category === 'owner' && !client.config.dev.ids.includes(interaction.user.id))
             return interaction.reply(this.errorReply(client, 'Oops! You are not the bot owner!'));

            return this.executeInteraction(client, slashCommand, interaction, user)
        }

        if (!interaction.isButton() && !interaction.isAnySelectMenu()) return;
        return this.handleInteraction(client, interaction, user);
    }
}

export default new InteractionEvent;