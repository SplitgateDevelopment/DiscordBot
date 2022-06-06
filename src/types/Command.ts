import Client from '../Bot';
import { Message, PermissionResolvable, Snowflake } from 'discord.js';

interface Run {
	(client: Client, message: Message, args: Snowflake[]): void;
}

export interface ICommand {
	name: string;
    description: string;
    usage?: string;
    ownerOnly?: boolean;
    userPermissions?: PermissionResolvable[];
    botPermissions?: PermissionResolvable[];
    run: Run
}

export type CommandOptions = {
	name: string;
    description: string;
    usage?: string;
    ownerOnly?: boolean;
    userPermissions?: PermissionResolvable[];
    botPermissions?: PermissionResolvable[];
    run: Run
}