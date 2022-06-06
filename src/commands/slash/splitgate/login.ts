import SlashCommand from '../../../util/structures/SlashCommand';
import User from '../../../schemas/User';
import { EmbedBuilder } from 'discord.js';

export default new SlashCommand({
    name: 'login',
    description: 'Login to splitgate with your Steam auth token',
    options: [
        {
            name: 'token',
            description: 'Your Steam auth token',
            type: 3,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const data = interaction.options.get('token');
        const token = data?.value?.toString() || '';

        const user = await User.findOne({ id: interaction.user.id });
        if (!user) await User.create({
            id: interaction.user.id,
            authToken: data,
        }).then(u => u.save());
        else user.authToken = token;
        await user?.save();

        try {
            const userData = await client.splitgate.login(token || '');
            const embed = new EmbedBuilder();
            embed.setTitle('☑️ | Login Successful');
            embed.setDescription(`> You are now logged in as **${userData.name}** (\`${userData.id}\`)`);
            embed.setColor('#00ff00');
            interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });

        } catch (error) {
            const embed = new EmbedBuilder();
            embed.setTitle('❌ | Error');
            embed.setDescription(`> An error occured while logging in:\n> ${error || 'Unknown error'}`);
            embed.setColor('#ff0000');
            interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        }
    },
});