import { z } from 'zod';
import AdminValidation from '../admin/admin.validation';

const createUserValidationSchema = z.object({
    body: z.object({
        password: z.string().min(6, 'Password must be at least 6 characters'),
    }),
});
const createAdminValidationSchema = z.object({
    body: z.object({
        password: z.string().min(6, 'Password must be at least 6 characters').optional(),
        admin: AdminValidation.createAdminValidationSchema,
    }),
});

const UserValidation = {
    createUserValidationSchema,
    createAdminValidationSchema,
};

export default UserValidation;
