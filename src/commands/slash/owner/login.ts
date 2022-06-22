import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
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
    run: async (client, interaction) => {
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
    },
});