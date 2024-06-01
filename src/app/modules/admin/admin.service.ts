import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import User from '../user/user.model';
import { TAdmin } from './admin.interface';
import Admin from './admin.model';

const createAdminToDB = async (payload: { password: string; admin: TAdmin }) => {
    const isExists = await Admin.findOne({ email: payload.admin.email });
    if (isExists) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Admin already exists!');
    }
    const password = payload?.password || config.DEFAULT_PASSWORD;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const createdUser = await User.create([{ password, role: 'admin' }], { session });

        if (!createdUser) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create user!');
        }

        const admin = { ...payload.admin, role: 'admin', user: createdUser[0]._id };

        const createdAdmin = await Admin.create([admin], { session });

        if (!createdAdmin) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create admin!');
        }

        await session.commitTransaction();
        await session.endSession();

        return createdAdmin[0];
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
};

const AdminService = {
    createAdminToDB,
};
export default AdminService;
