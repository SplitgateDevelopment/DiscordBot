import { Message, PermissionResolvable, Snowflake } from 'discord.js';
import Bot from '../../Bot';
import { ICommand, CommandOptions } from '../../types/Command';

class Command implements ICommand {
    name: string;
    description: string;
    usage?: string;
    ownerOnly?: boolean = false;
    userPermissions?: PermissionResolvable[] = [];
    botPermissions?: PermissionResolvable[] = [];
    run: (client: Bot, message: Message, args: Snowflake[]) => void;
    constructor(options: CommandOptions) {
        this.name = options.name;
        this.description = options.description;
        this.usage = options.usage || this.name;
        this.ownerOnly = options.ownerOnly || false;
        this.userPermissions = options.userPermissions || [];
        this.botPermissions = options.botPermissions || [];
        this.run = options.run;
    }
}

export default Command;