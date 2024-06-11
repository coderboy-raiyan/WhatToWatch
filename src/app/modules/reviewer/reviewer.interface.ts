/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

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

export type TReviewerModel = Model<TReviewer> & {
    isReviewerExists(email: string): Promise<TReviewer>;
};
