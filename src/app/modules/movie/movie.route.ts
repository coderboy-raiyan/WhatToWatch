import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import MovieControllers from './movie.controller';
import MovieValidations from './movie.validation';

const router = Router();

router.get('/', MovieControllers.getAllMovies);
router.get('/:slug', MovieControllers.getSingleMovie);
router.post(
    '/create-movie',
    auth(['admin']),
    validateRequest(MovieValidations.createMovieValidationSchema),
    MovieControllers.createMovie
);
router.patch(
    '/update-movie/:id',
    auth(['admin']),
    validateRequest(MovieValidations.updateMovieValidationSchema),
    MovieControllers.updateMovie
);
router.delete('/:id', auth(['admin']), MovieControllers.deleteMovie);

const MovieRoutes = router;

export default MovieRoutes;
