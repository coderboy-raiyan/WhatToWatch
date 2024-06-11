import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import catchAsyncError from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AuthServices from './auth.service';

const loginUser = catchAsyncError(async (req: Request, res: Response) => {
    const { accessToken, refreshToken, user } = await AuthServices.loginUser(req.body);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        secure: config.NODE_ENV === 'production',
    });

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Signed in successfully',
        data: { ...user, accessToken },
    });
});

const AuthControllers = {
    loginUser,
};

export default AuthControllers;
