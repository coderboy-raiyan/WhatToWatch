import bcrypt, { hash } from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser, TUserModel } from './user.interface';

const userSchema = new Schema<TUser, TUserModel>(
    {
        password: {
            type: String,
            required: true,
            select: 0,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        passwordChangedTimeStamp: {
            type: Date,
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

userSchema.statics.isAdminExistsWithThisEmail = async function (email: string) {
    const user = await this.findOne({ email }).select('+password');
    return user;
};
userSchema.statics.verifyPassword = async function (plainText: string, encryptedPassword: string) {
    const isVerified = await bcrypt.compare(plainText, encryptedPassword);
    return isVerified;
};

const User = model<TUser, TUserModel>('User', userSchema);

export default User;
