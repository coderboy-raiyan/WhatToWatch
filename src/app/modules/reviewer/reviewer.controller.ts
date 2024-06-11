import { StatusCodes } from 'http-status-codes';
import catchAsyncError from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TReviewer } from './reviewer.interface';
import ReviewerServices from './reviewer.service';

const registerReviewer = catchAsyncError(async (req, res) => {
    const { accessToken, reviewer } = await ReviewerServices.registerReviewerIntoDB(req.body);

    sendResponse<{ reviewer: TReviewer; accessToken: string }>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Signed up successfully. Please check your email to verify your account!',
        data: { reviewer, accessToken },
    });
});

const ReviewerControllers = {
    registerReviewer,
};

export default ReviewerControllers;
