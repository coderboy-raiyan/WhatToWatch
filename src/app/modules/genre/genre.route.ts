import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import GenreControllers from './genre.controller';
import GenreValidations from './genre.validation';

const router = Router();

router.post(
    '/',
    auth(['admin']),
    validateRequest(GenreValidations.createGenreValidationSchema),
    GenreControllers.createGenre
);

router.get('/', auth(['admin']), GenreControllers.getAllGenres);
router.get('/:id', GenreControllers.getSingeGenre);
router.delete('/:id', auth(['admin']), GenreControllers.deleteGenre);
router.patch('/:id', auth(['admin']), GenreControllers.updateGenre);

const GenreRoutes = router;

export default GenreRoutes;
