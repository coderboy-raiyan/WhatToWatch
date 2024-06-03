import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.route';
import UserRoutes from '../modules/user/user.route';

type IRoutes = {
    path: string;
    route: Router;
};

const router = Router();

const routes: IRoutes[] = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
