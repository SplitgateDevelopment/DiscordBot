import { ButtonInteraction } from 'discord.js';
import Bot from '../../Bot';
import User from '../../schemas/User';
import Interaction from '../../util/structures/Interaction';

class UnlinkButton extends Interaction {
    constructor() {
        super({
            customId: 'UnlinkButton',
        })
    }

    async run (client: Bot, interaction: ButtonInteraction) {
        try {
            const userData = await User.findByIdAndUpdate(interaction.user.id, {
                splitgateId: '',
            });
            if (!userData) return interaction.reply({
                    embeds: [client.embed({
                        text: 'You don\'t not have a linked profile yet',
                        type: 'error'
                    })],
                    ephemeral: true,
                });
        } catch (error) {
            return interaction.reply({
                embeds: [client.embed({
                    text: 'Could not unlink your profiles',
                    type: 'error'
                })],
                ephemeral: true,
            });
        }

        return interaction.reply({
            embeds: [client.embed({
                text: 'You have unlinked your profiles',
                type: 'success'
            })],
            ephemeral: true,
        });
    }
}

export default new UnlinkButton;