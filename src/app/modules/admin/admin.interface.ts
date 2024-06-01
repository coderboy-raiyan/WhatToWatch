import { Types } from 'mongoose';

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
