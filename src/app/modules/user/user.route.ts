import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import UserController from './user.controller';
import UserValidation from './user.validation';

const router = Router();

router.get('/', UserController.getAllUsers);
router.post(
    '/create-admin',
    validateRequest(UserValidation.createAdminValidationSchema),
    UserController.createAdmin
);

const UserRoutes = router;

export default UserRoutes;
