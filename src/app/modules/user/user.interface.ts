export type TUser = {
    name: {
        firstName: string;
        lastName: string;
    };
    password: string;
    role?: 'admin' | 'reviewer';
};
