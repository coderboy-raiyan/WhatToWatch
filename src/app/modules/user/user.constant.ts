const UserRoles = ['admin', 'reviewer'];

const UserRolesEnum = {
    admin: 'admin',
    reviewer: 'reviewer',
} as const;

const UserConstants = {
    UserRoles,
    UserRolesEnum,
};

export default UserConstants;
