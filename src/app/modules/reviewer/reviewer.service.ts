import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import ApiError from '../../errors/ApiError';
import AuthUtils from '../auth/auth.utils';
import User from '../user/user.model';
import { TReviewer } from './reviewer.interface';
import Reviewer from './reviewer.model';

const registerReviewerIntoDB = async (payload: TReviewer & { password: string }) => {
    const isExists = await User.findOne({ email: payload.email });
    if (isExists) {
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Already have an account. Please sign in!');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const createdUser = await User.create(
            [{ role: 'reviewer', email: payload.email, password: payload.password }],
            {
                session,
            }
        );

        if (!createdUser) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Sign up failed!');
        }

        const modifiedReviewer = { ...payload, user: createdUser[0]?._id };

        const createdReviewer = await Reviewer.create([modifiedReviewer], { session });
        if (!createdReviewer) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Sign up failed!');
        }

        const accessToken = AuthUtils.generateAccessToken({
            _id: createdUser[0]?._id,
            role: createdUser[0]?.role,
        });

        await session.commitTransaction();
        await session.endSession();

        return {
            accessToken,
            reviewer: createdReviewer[0],
        };
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
};

const ReviewerServices = {
    registerReviewerIntoDB,
};
export default ReviewerServices;
