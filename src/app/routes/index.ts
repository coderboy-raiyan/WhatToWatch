import { Router } from 'express';

type IRoutes = {
    path: string;
    route: Router;
};

const router = Router();

const routes: IRoutes[] = [];

routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
