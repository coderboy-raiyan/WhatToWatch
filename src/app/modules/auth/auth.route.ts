import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import ReviewerController from '../reviewer/reviewer.controller';
import ReviewValidation from '../reviewer/reviewer.validation';

const router = Router();

router.post(
    '/register-reviewer',
    validateRequest(ReviewValidation.createReviewerValidationSchema),
    ReviewerController.registerReviewer
);

const AuthRoutes = router;

export default AuthRoutes;
