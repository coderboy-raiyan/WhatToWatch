import { Router } from 'express';
import AuthRoutes from '../modules/auth/auth.route';
import MovieRoutes from '../modules/movie/movie.route';
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
    {
        path: '/movies',
        route: MovieRoutes,
    },
];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
