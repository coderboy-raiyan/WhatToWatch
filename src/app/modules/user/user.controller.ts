import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsyncError from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TUser } from './user.interface';
import UserServices from './user.service';

const getAllUsers = catchAsyncError(async (req: Request, res: Response) => {
    const result = await UserServices.getAllUsersFromDB();
    sendResponse<TUser[]>(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Users retrieved successfully',
        data: result,
    });
});

const UserControllers = {
    getAllUsers,
};

export default UserControllers;
