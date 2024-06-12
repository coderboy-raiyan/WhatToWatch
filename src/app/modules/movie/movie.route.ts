import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import MovieControllers from './movie.controller';
import MovieValidations from './movie.validation';

const router = Router();

router.get('/', MovieControllers.getAllMovies);
router.get('/:slug', MovieControllers.getSingleMovie);
router.post(
    '/create-movie',
    validateRequest(MovieValidations.createMovieValidationSchema),
    MovieControllers.createMovie
);
router.patch(
    '/update-movie/:id',
    validateRequest(MovieValidations.updateMovieValidationSchema),
    MovieControllers.updateMovie
);
router.delete('/:id', MovieControllers.deleteMovie);

const MovieRoutes = router;

export default MovieRoutes;
