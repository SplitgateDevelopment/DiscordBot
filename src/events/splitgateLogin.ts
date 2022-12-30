import { User } from 'splitgate.js/dist/src/typings/v2';
import Bot from '../Bot';
import Event from '../util/structures/Event';

export default new Event({
    name: 'splitgateLogin',
    run: async (client: Bot, loginData: User) => {
        client.logger.success(`Logged in on splitgate as ${loginData?.name || 'No name'} (${loginData.id || 'No id'})`);

        if (client.config.splitgate?.redeemDaily) {
            redeem(client);
            setInterval(() => redeem(client), 20*60*60*1000);
        }
    }
});

async function redeem(client: Bot) {
    try {
        const data = await client.splitgate.claimDailyReward();
        client.logger.success(`Claimed daily reward, day ${data.dayOfWeek}`)
    } catch (error) {
        client.logger.error('Failed to claim daily reward')
    }
}