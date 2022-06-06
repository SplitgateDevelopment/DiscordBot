import Command from '../../../util/structures/Command';

export default new Command({
    name: 'test',
    description: 'A test command',
    run: async (client, message) => {
        message.channel.send('This is a test 🧪.');
    }
});