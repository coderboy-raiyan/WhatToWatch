import { z } from 'zod';

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.object({
            firstName: z
                .string()
                .max(20, { message: 'First name should not exceed 20 characters.' }),
            lastName: z.string().max(20, { message: 'Last name should not exceed 20 characters.' }),
        }),
        email: z.string().email(),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        contactNo: z.string().max(11),
    }),
});
const updateUserValidationSchema = z.object({
    body: z.object({
        name: z
            .object({
                firstName: z
                    .string()
                    .max(20, { message: 'First name should not exceed 20 characters.' })
                    .optional(),
                lastName: z
                    .string()
                    .max(20, { message: 'Last name should not exceed 20 characters.' })
                    .optional(),
            })
            .optional(),
        email: z.string().email().optional(),
        contactNo: z.string().max(11).optional(),
    }),
});

const UserValidation = {
    updateUserValidationSchema,
    createUserValidationSchema,
};

export default UserValidation;
