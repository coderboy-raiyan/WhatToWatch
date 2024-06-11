import { Schema, model } from 'mongoose';
import UserConstants from '../user/user.constant';
import { TReviewer } from './reviewer.interface';

const reviewerSchema = new Schema<TReviewer>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
            required: true,
        },
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
        contactNo: {
            type: String,
            default: '',
        },
        address: {
            type: String,
            default: '',
        },
        profileImg: {
            type: String,
            default: '',
        },
        role: {
            type: String,
            enum: UserConstants.UserRole,
        },
    },
    { timestamps: true }
);

const Reviewer = model<TReviewer>('Reviewer', reviewerSchema);

export default Reviewer;
