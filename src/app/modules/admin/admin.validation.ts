import { z } from 'zod';

const createAdminValidationSchema = z.object({
    body: z.object({
        user: z.string(),
        address: z.string(),
        email: z.string(),
        contactNo: z.string().max(11),
    }),
});
const updateAdminValidationSchema = z.object({
    body: z.object({
        address: z.string().optional(),
        contactNo: z.string().max(11).optional(),
    }),
});

const UserValidation = {
    updateAdminValidationSchema,
    createAdminValidationSchema,
};

export default UserValidation;
