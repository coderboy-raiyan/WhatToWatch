import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import User from '../user/user.model';
import { TAdmin } from './admin.interface';
import Admin from './admin.model';

const createAdminToDB = async (payload: TAdmin & TUser) => {
    const isExists = await User.findOne({ email: payload.email });
    if (isExists) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Admin already exists!');
    }
    const password = payload?.password || config.DEFAULT_PASSWORD;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const createdUser = await User.create([{ password, role: 'admin', email: payload.email }], {
            session,
        });

        if (!createdUser) {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create user!');
        }

        const admin = { ...payload, user: createdUser[0]._id };

        const createdAdmin = await Admin.create([admin], { session });

        if (!createdAdmin) {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create admin!');
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

const AdminServices = {
    createAdminToDB,
};
export default AdminServices;
