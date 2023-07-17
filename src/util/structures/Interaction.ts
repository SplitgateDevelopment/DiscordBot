import { IInteraction, InteractionOptions } from '../../types/Interaction';
import {  PermissionResolvable } from 'discord.js';
import { InteractionRunDTO } from '../../types/Bot';

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

    run (_executeDTO: InteractionRunDTO): void {
        throw new Error('Not implemented');
    }
}

export default Interaction;