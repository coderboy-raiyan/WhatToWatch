import { Router } from 'express';
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
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
