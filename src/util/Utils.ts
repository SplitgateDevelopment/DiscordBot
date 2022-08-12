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

    uptime(): number {
        return Date.now() / 1000 - (this.client?.uptime || 0) / 1000;
    }

    objectSize(obj: object): number {
        return Object.keys(obj).length;
    }

    isUrl(str: string): boolean {
        const regex = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
        return regex !== null;
    }
}

export default Utils;