import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import AdminControllers from '../admin/admin.controller';
import AdminValidations from '../admin/admin.validation';
import UserControllers from './user.controller';

const router = Router();

router.get('/', UserControllers.getAllUsers);

router.post(
    '/create-admin',
    auth(['admin']),
    validateRequest(AdminValidations.createAdminValidationSchema),
    AdminControllers.createAdmin
);

const UserRoutes = router;

export default UserRoutes;
