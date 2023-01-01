import { IInteraction, InteractionOptions } from '../../types/Interaction';
import { BaseInteraction, PermissionResolvable } from 'discord.js';
import Bot from '../../Bot';

class Interaction implements IInteraction {
    customId: string;
    ownerOnly: boolean;
    authorOnly: boolean;
    userPermissions: PermissionResolvable[];
    botPermissions: PermissionResolvable[];
    constructor(options: InteractionOptions) {
        this.customId = options.customId;
        this.ownerOnly = options.ownerOnly || false;
        this.authorOnly = options.authorOnly || true;
        this.userPermissions = options.userPermissions || [];
        this.botPermissions = options.botPermissions || [];
        if (options.run) this.run = options.run;
    }

    run (_client: Bot, _interaction: BaseInteraction): void {
        throw new Error('Not implemented');
    }
}

export default Interaction;