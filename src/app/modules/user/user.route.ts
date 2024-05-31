import { Router } from 'express';
import UserController from './user.controller';

const router = Router();

router.get('/', UserController.getAllUsers);

const UserRoutes = router;

export default UserRoutes;
