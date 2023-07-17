
import { PermissionResolvable } from 'discord.js';
import { InteractionRunDTO } from './Bot';

type InteractionOptions = {
    customId: string;
    ownerOnly?: boolean;
    authorOnly?: boolean;
    userPermissions?: PermissionResolvable[];
    botPermissions?: PermissionResolvable[];
    run?: (executeDTO: InteractionRunDTO) => void | Promise<void>;
};

interface IInteraction {
    customId: string;
    ownerOnly: boolean;
    authorOnly: boolean;
    userPermissions: PermissionResolvable[];
    botPermissions: PermissionResolvable[];
    run: (executeDTO: InteractionRunDTO) => void | Promise<void>;
}

export {
    IInteraction,
    InteractionOptions,
}