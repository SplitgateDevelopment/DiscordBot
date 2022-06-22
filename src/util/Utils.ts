import Bot from '../Bot';

class Utils {
    client: Bot;
    constructor(client: Bot) {
        this.client = client;
    }

    inviteUrl(client_id: string = this.client.user?.id || this.client.config.bot?.id || '', permissions = 414464723008, scope: string[] = ['bot', 'applications.commands']): string {
        return `https://discord.com/api/oauth2/authorize?client_id=${client_id}&permissions=${permissions}&scope=${scope.join('%20')}`;
    }

    codeBlock(text: string | number = 'Undefined'): string {
        return `\`${text}\``
    }
}

export default Utils;