import { Router } from 'express';
import AdminService from '../admin/admin.service';
import UserController from './user.controller';

const router = Router();

router.get('/', UserController.getAllUsers);
router.post('/create-admin', AdminService.registerAdminToDB);

const UserRoutes = router;

export default UserRoutes;
