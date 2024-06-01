import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsyncError from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TAdmin } from '../admin/admin.interface';
import AdminService from '../admin/admin.service';
import { TUser } from './user.interface';
import UserService from './user.service';

const getAllUsers = catchAsyncError(async (req: Request, res: Response) => {
    const result = await UserService.getAllUsersFromDB();
    sendResponse<TUser[]>(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Users retrieved successfully',
        data: result,
    });
});
const createAdmin = catchAsyncError(async (req: Request, res: Response) => {
    const result = await AdminService.createAdminToDB(req.body);
    sendResponse<TAdmin>(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Admin created successfully',
        data: result,
    });
});

const UserController = {
    getAllUsers,
    createAdmin,
};

export default UserController;
