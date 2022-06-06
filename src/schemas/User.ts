import { model, Schema } from 'mongoose';
import { IUser } from '../types/User';

const UserSchema = new Schema<IUser>({
    id: {
        type: String || Number,
        required: true,
    },
    authToken: {
        type: String,
        required: false,
    }
});

const User = model<IUser>('Users', UserSchema);

export default User;