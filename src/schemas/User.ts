import { model, Schema } from 'mongoose';
import { IUser } from '../types/User';

const UserSchema = new Schema<IUser>({
    _id: {
        type: String || Number,
        required: true,
    },
    splitgateId: {
        type: String,
        required: false,
    }
});

const User = model<IUser>('Users', UserSchema);

export default User;