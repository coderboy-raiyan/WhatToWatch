import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AdminController from '../admin/admin.controller';
import AdminValidation from '../admin/admin.validation';
import UserController from './user.controller';

const router = Router();

router.get('/', UserController.getAllUsers);

router.post(
    '/create-admin',
    validateRequest(AdminValidation.createAdminValidationSchema),
    AdminController.createAdmin
);

const UserRoutes = router;

export default UserRoutes;
