import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/ApiError';
import Admin from '../admin/admin.model';
import Reviewer from '../reviewer/reviewer.model';
import User from '../user/user.model';
import { TAuthLogin } from './auth.interface';
import AuthUtils from './auth.utils';

const loginUser = async (payload: TAuthLogin) => {
    const { email } = payload;
    const user = await User.isAdminExistsWithThisEmail(email);

    if (!user) {
        throw new AppError(
            StatusCodes.FORBIDDEN,
            "You haven't signed up yet. Please create an account!"
        );
    }
    const verifyPassword = await User.verifyPassword(payload.password, user.password);
    if (!verifyPassword) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Password did'nt matched!");
    }

    let userProfile;
    if (user.role === 'admin') {
        userProfile = await Admin.findOne({ email });
    } else {
        userProfile = await Reviewer.findOne({ email });
    }

    const accessToken = AuthUtils.generateAccessToken({ _id: user?._id, role: user.role });
    const refreshToken = AuthUtils.generateRefreshToken({ _id: user?._id, role: user.role });

    return { accessToken, refreshToken, user: userProfile.toObject() };
};

const AuthServices = {
    loginUser,
};

export default AuthServices;
