import { z } from 'zod';

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string(),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    }),
});

const AuthValidations = {
    loginValidationSchema,
};

export default AuthValidations;
