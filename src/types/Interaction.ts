
import { BaseInteraction, PermissionResolvable } from 'discord.js';
import Bot from '../Bot';

type InteractionOptions = {
    customId: string;
    ownerOnly?: boolean;
    authorOnly?: boolean;
    userPermissions?: PermissionResolvable[];
    botPermissions?: PermissionResolvable[];
    run?: (client: Bot, interaction: BaseInteraction) => void | Promise<void>;
};

interface IInteraction {
    customId: string;
    ownerOnly: boolean;
    authorOnly: boolean;
    userPermissions: PermissionResolvable[];
    botPermissions: PermissionResolvable[];
    run: (client: Bot, interaction: BaseInteraction) => void | Promise<void>;
}

export {
    IInteraction,
    InteractionOptions,
}