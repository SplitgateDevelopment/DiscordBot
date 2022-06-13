
import Command from '../../../util/structures/Command';

export default new Command({
    name: 'login',
    description: 'Login the bot to splitgate via a Steam auth token',
    ownerOnly: true,
    run: async (client, message, args) => {
        if (client.splitgate.authorized) return message.reply({
            embeds: [client.embed({
                type: 'error',
                text: 'Already logged in'
            })]
        });
        
        const token = args[0];
        if (!token) return message.channel.send('> No token specified ❌');

        try {
            const loginData = await client.splitgate.login(token);
            message.reply({
                embeds: [client.embed({
                    type: 'success',
                    text: `The bot is now logged in as **${loginData.name}** (\`${loginData.id}\`)`
                })],
            });

            client.emit('splitgateLogin', loginData);
        } catch (error) {
            message.reply({
                embeds: [client.embed({
                    type: 'error',
                    text: `An error occured while logging in:\n> ${error || 'Unknown error'}`
                })],
            });
        }
    },
});