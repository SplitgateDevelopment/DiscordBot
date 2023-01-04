
import { BaseInteraction, PermissionResolvable } from 'discord.js';
import Bot from '../Bot';
import { IUser } from './User';

type InteractionOptions = {
    customId: string;
    ownerOnly?: boolean;
    authorOnly?: boolean;
    userPermissions?: PermissionResolvable[];
    botPermissions?: PermissionResolvable[];
    run?: (client: Bot, interaction: BaseInteraction, user: IUser) => void | Promise<void>;
};

interface IInteraction {
    customId: string;
    ownerOnly: boolean;
    authorOnly: boolean;
    userPermissions: PermissionResolvable[];
    botPermissions: PermissionResolvable[];
    run: (client: Bot, interaction: BaseInteraction, user: IUser) => void | Promise<void>;
}

export {
    IInteraction,
    InteractionOptions,
}