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

const verifyToken = (token: string, tokenSecret: string) => {
    const verify = jwt.verify(token, tokenSecret);
    return verify;
};

const AuthUtils = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
};

export default AuthUtils;
