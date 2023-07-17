import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import SlashCommand from '../../../util/structures/SlashCommand';

class LoginCommand extends SlashCommand {
    constructor() {
        super({
            name: 'login',
            description: 'Login the bot to splitgate via a Steam auth token',
            options: [
                {
                    name: 'authtoken',
                    description: 'The auth token to login with',
                    type: 3,
                    required: true,
                }
            ],
            private: true,
        })
    }

    async run ({ client, interaction }: SlashCommandRunDTO) {
        if (client.splitgate.authorized) return interaction.reply({
            embeds: [client.embed({
                type: 'error',
                text: 'Already logged in'
            })],
            ephemeral: true,
        });
        
        const input = interaction.options.get('authtoken');
        const token = input?.value?.toString() || '';
        
        try {
            const loginData = await client.splitgate.login(token);
            interaction.reply({
                embeds: [client.embed({
                    type: 'success',
                    text: `The bot is now logged in as **${loginData.name}** (\`${loginData.id}\`)`
                })],
                ephemeral: true,
            });

            client.emit('splitgateLogin', loginData);
        } catch (error) {
            interaction.reply({
                embeds: [client.embed({
                    type: 'error',
                    text: `An error occured while logging in:\n> ${error || 'Unknown error'}`
                })],
                ephemeral: true,
            });
        }
    }
}

export default new LoginCommand;