import { hash } from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
    {
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

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await hash(this.password, Number(config.BCRYPT_SALT_ROUNDS));
    }
    next();
});

const User = model('User', userSchema);

export default User;
