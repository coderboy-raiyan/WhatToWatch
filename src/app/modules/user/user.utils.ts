import jwt from 'jsonwebtoken';
import config from '../../config';

const generateToken = (payload: Record<string, unknown>, expiresIn: string = '1d') => {
    return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, { expiresIn });
};

const UserUtils = {
    generateToken,
};

export default UserUtils;
