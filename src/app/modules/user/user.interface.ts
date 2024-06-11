/* eslint-disable no-unused-vars */
import { Model, ObjectId } from 'mongoose';
import UserConstants from './user.constant';

export type TUserRoles = keyof typeof UserConstants.UserRolesEnum;

export type TUser = {
    password: string;
    email: string;
    role?: TUserRoles;
    isVerified: boolean;
    passwordChangedTimeStamp: Date;
};

export type TUserModel = Model<TUser> & {
    isAdminExistsWithThisEmail(email: string): Promise<TUser & { _id: ObjectId }>;
    verifyPassword(plainText: string, encryptedPassword: string): Promise<boolean>;
};
