/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TAdmin = {
    name: {
        firstName: string;
        lastName: string;
    };
    user: Types.ObjectId;
    profileImg?: string;
    contactNo: string;
    address: string;
    email: string;
    role?: 'admin' | 'reviewer';
};
export type TAdminModel = Model<TAdmin> & {
    isAdminExists(email: string): Promise<TAdmin>;
};
