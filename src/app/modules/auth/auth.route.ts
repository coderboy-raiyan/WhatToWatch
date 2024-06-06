import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import ReviewerControllers from '../reviewer/reviewer.controller';
import ReviewValidations from '../reviewer/reviewer.validation';

const router = Router();

router.post(
    '/register-reviewer',
    validateRequest(ReviewValidations.createReviewerValidationSchema),
    ReviewerControllers.registerReviewer
);

const AuthRoutes = router;

export default AuthRoutes;
