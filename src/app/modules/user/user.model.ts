import { hash } from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
    {
        password: {
            type: String,
            required: true,
            select: 0,
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

userSchema.pre('find', async function (next) {
    this.find(this.getQuery()).projection({ password: 0 });
    next();
});
userSchema.pre('findOne', async function (next) {
    this.find(this.getQuery()).projection({ password: 0 });
    next();
});

const User = model<TUser>('User', userSchema);

export default User;
