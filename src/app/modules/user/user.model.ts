import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
    {
        name: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },

        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
        },
    },
    { timestamps: true }
);

const User = model('User', userSchema);

export default User;
