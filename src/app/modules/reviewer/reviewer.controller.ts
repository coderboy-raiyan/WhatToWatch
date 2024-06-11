import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import catchAsyncError from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TReviewer } from './reviewer.interface';
import ReviewerServices from './reviewer.service';

const registerReviewer = catchAsyncError(async (req, res) => {
    const { accessToken, refreshToken, reviewer } = await ReviewerServices.registerReviewerIntoDB(
        req.body
    );

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        secure: config.NODE_ENV === 'production',
    });

    sendResponse<{ reviewer: TReviewer; accessToken: string }>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Signed up successfully',
        data: { reviewer, accessToken },
    });
});

const ReviewerControllers = {
    registerReviewer,
};

export default ReviewerControllers;
