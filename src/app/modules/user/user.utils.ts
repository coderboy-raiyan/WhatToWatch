import jwt from 'jsonwebtoken';
import config from '../../config';

const generateAccessToken = (payload: Record<string, unknown>) => {
    return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
        expiresIn: config.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });
};
const generateRefreshToken = (payload: Record<string, unknown>) => {
    return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
        expiresIn: config.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });
};

const UserUtils = {
    generateAccessToken,
    generateRefreshToken,
};

export default UserUtils;
