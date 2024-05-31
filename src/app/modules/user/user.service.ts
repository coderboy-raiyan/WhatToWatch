import User from './user.model';

const getAllUsersFromDB = async () => {
    const result = await User.find({});
    return result;
};

const UserService = {
    getAllUsersFromDB,
};

export default UserService;