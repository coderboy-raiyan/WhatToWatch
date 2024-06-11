import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import ReviewerControllers from '../reviewer/reviewer.controller';
import ReviewValidations from '../reviewer/reviewer.validation';
import AuthControllers from './auth.controller';
import AuthValidations from './auth.validation';

const router = Router();

router.post(
    '/login',
    validateRequest(AuthValidations.loginValidationSchema),
    AuthControllers.loginUser
);
router.post(
    '/register-reviewer',
    validateRequest(ReviewValidations.createReviewerValidationSchema),
    ReviewerControllers.registerReviewer
);

const AuthRoutes = router;

export default AuthRoutes;
