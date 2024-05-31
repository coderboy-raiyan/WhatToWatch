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
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profileImg: {
            type: String,
            default: '',
        },
        contactNo: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = model('User', userSchema);

export default User;
