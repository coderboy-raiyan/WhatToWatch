import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AdminControllers from '../admin/admin.controller';
import AdminValidations from '../admin/admin.validation';
import UserControllers from './user.controller';

const router = Router();

router.get('/', UserControllers.getAllUsers);

router.post(
    '/create-admin',
    validateRequest(AdminValidations.createAdminValidationSchema),
    AdminControllers.createAdmin
);

const UserRoutes = router;

export default UserRoutes;
