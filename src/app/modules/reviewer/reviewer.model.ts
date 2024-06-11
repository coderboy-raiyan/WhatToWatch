import { Schema, model } from 'mongoose';
import UserConstants from '../user/user.constant';
import { TReviewer, TReviewerModel } from './reviewer.interface';

const reviewerSchema = new Schema<TReviewer, TReviewerModel>(
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
            enum: UserConstants.UserRoles,
        },
    },
    { timestamps: true }
);

reviewerSchema.statics.isReviewerExists = async function (email: string) {
    const reviewer = await this.findOne({ email });
    return reviewer;
};

const Reviewer = model<TReviewer, TReviewerModel>('Reviewer', reviewerSchema);

export default Reviewer;
