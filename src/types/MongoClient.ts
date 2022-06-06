import { ConnectOptions } from 'mongoose';

type ClientOptions = {
    uri: string | undefined;
    options?: ConnectOptions
};

export {
    ClientOptions
};