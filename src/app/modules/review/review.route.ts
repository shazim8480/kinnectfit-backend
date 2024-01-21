import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENU_USER_ROLE } from '../../../enums/user';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';
const router = express.Router();
router.post(
  '/create-review',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.USER),
  validateRequest(ReviewValidation.createZodReviewSchema),
  ReviewController.createReview,
);
router.get('/reviews', ReviewController.getAllReviews);
router.get(
  '/:id',
  // auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER, ENU_USER_ROLE.USER),
  ReviewController.getSingleReview,
);
router.get(
  '/mealplan-review/:id',
  // auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER, ENU_USER_ROLE.USER),
  ReviewController.getReviewsByMealPlan,
);

export const ReviewRoutes = router;
