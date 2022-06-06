import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'test',
    description: 'A test command',
    run: async (client, interaction) => {
        interaction.reply({content: 'This is a test 🧪.', ephemeral: true });
    },
});