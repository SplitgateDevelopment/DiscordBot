import { ConnectOptions, Connection, connect, connection } from 'mongoose';
import { Logger } from '@schiacciata/logger';
import { ClientOptions } from '../types/MongoClient';
import Bot from '../Bot';

class MongoClient {
    uri: string;
    settings: ConnectOptions;
    logger: Logger;
    constructor(options: ClientOptions, { logger }: Bot) {

        this.uri = options.uri || '';
        this.settings = options.options || {
            useUnifiedTopology: true,
            autoIndex: true,
        } as ConnectOptions;
        this.logger = logger;
    }

    async init (): Promise<Connection> {
        
        await connect(this.uri, this.settings, (e) => e
            ? this.logger.error(`Failed to connect to database 🌿\n > ${e.message}`)
            : this.logger.success('Connected to database 🌿')
        );
        
        connection.on('disconnected', () => this.logger.warn('Disconnected from database 🌿'));
    
        return connection;
      }
}

export default MongoClient;