import { User } from 'splitgate.js/dist/src/typings/v2';
import Bot from '../Bot';
import Event from '../util/structures/Event';

class SplitgateLoginEvent extends Event {
    constructor() {
        super({
            name: 'splitgateLogin',
        })
    }
    
    async redeem(client: Bot) {
        try {
            const data = await client.splitgate.claimDailyReward();
            client.logger.success(`Claimed daily reward, day ${data.dayOfWeek} (${data.daysClaimedCount}/7)`)
        } catch (error) {
            client.logger.error('Failed to claim daily reward')
        }
    }

    async run (client: Bot, loginData: User) {
        client.logger.success(`Logged in on splitgate as ${loginData?.name || 'No name'} (${loginData.id || 'No id'})`);

        if (client.config.splitgate?.redeemDaily) {
            this.redeem(client);
            setInterval(() => this.redeem(client), 20*60*60*1000);
        }
    }
}



export default new SplitgateLoginEvent;