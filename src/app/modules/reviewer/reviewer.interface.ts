import { Types } from 'mongoose';

export type TReviewer = {
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
