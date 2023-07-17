import { ButtonInteraction } from 'discord.js';
import { InteractionRunDTO } from '../../types/Bot';
import Interaction from '../../util/structures/Interaction';

class UnlinkButton extends Interaction {
    constructor() {
        super({
            customId: 'UnlinkButton',
        })
    }
    
    async run ({ client, interaction }: InteractionRunDTO<ButtonInteraction>) {
        try {
            const userData = await client.db.user.update({
                where: {
                    id: interaction.user.id,
                },
                data: {
                    splitgateId: '',
                }
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