import { Message, PermissionResolvable, Snowflake } from 'discord.js';
import Bot from '../../Bot';
import { ICommand, CommandOptions } from '../../types/Command';

class Command implements ICommand {
    name: string;
    description: string;
    usage: string;
    ownerOnly: boolean;
    userPermissions: PermissionResolvable[];
    botPermissions: PermissionResolvable[];
    constructor(options: CommandOptions) {
        this.name = options.name;
        this.description = options.description;
        this.usage = options.usage || this.name;
        this.ownerOnly = options.ownerOnly || false;
        this.userPermissions = options.userPermissions || [];
        this.botPermissions = options.botPermissions || [];
        if (options.run) this.run = options.run;
    }

    run (_client: Bot, _message: Message, _args: Snowflake[]): void {
        throw new Error('Not implemented');
    }
}

export default Command;