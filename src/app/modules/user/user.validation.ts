import { z } from 'zod';

const createUserValidationSchema = z.object({
    body: z.object({
        password: z.string().min(6, 'Password must be at least 6 characters'),
    }),
});

const UserValidation = {
    createUserValidationSchema,
};

export default UserValidation;
