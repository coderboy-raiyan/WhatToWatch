import { StatusCodes } from 'http-status-codes';
import { JwtPayload, verify } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRoles } from '../modules/user/user.interface';
import User from '../modules/user/user.model';
import catchAsyncError from '../utils/catchAsync';

function auth(role: TUserRoles[]) {
    return catchAsyncError(async (req, res, next) => {
        const token = req?.headers?.authorization?.split('Bearer ')[1];

        if (!token) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                'You must be logged in to access this route. Please log in or sign up to continue.'
            );
        }

        const verifyToken = verify(token, config.JWT_ACCESS_SECRET) as JwtPayload;
        if (!verifyToken) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                'This route is restricted. Please sign up or sign in'
            );
        }

        if (!role && !role.length) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                'Permission denied. You do not have the necessary permissions to access this route.'
            );
        }

        if (!role.includes(verifyToken?.role)) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                'Permission denied. You do not have the necessary permissions to access this route.'
            );
        }

        const user = await User.findById(verifyToken?._id);
        if (!user) {
            throw new AppError(
                StatusCodes.UNAUTHORIZED,
                'You must be logged in to access this route. Please log in or sign up to continue.'
            );
        }
        req.user = user;
        next();
    });
}

export default auth;
