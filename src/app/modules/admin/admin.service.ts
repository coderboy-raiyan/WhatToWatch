import { StatusCodes } from 'http-status-codes';
import ApiError from '../../errors/ApiError';
import { TAdmin } from './admin.interface';
import Admin from './admin.model';

const registerAdminToDB = async (payload: TAdmin) => {
    const isExists = await Admin.findOne({ email: payload.email });
    if (isExists) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Admin already exists!');
    }
};

const AdminService = {
    registerAdminToDB,
};
export default AdminService;
