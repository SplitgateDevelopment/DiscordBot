import { ColorResolvable } from 'discord.js';

const colors = Object.freeze({
    success: '#00ff00',
    error: '#ff0000',
}) as Readonly<{
    [key: string]: ColorResolvable
}>;

const emojis = Object.freeze({
    success: '☑️',
    error: '❌'
});

export {
    colors,
    emojis
};