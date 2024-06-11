import { StatusCodes } from 'http-status-codes';
import catchAsyncError from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ReviewerServices from './reviewer.service';

const registerReviewer = catchAsyncError(async (req, res) => {
    const { reviewer } = await ReviewerServices.registerReviewerIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Signed up successfully. Please check your email to verify your account!',
        data: { reviewer },
    });
});

const ReviewerControllers = {
    registerReviewer,
};

export default ReviewerControllers;
