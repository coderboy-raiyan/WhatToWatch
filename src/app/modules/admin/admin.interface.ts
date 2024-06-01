import { Types } from 'mongoose';

export type TAdmin = {
    user: Types.ObjectId;
    profileImg?: string;
    contactNo: string;
    address: string;
    email: string;
};
