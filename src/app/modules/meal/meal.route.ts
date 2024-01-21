import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENU_USER_ROLE } from '../../../enums/user';
import { MealValidation } from './meal.validation';
import { MealController } from './meal.controller';
const router = express.Router();
router.post(
  '/create-meal',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
  validateRequest(MealValidation.createZodMealSchema),
  MealController.createMeal,
);
router.get(
  '/meals',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
  MealController.getAllMeals,
);
router.get(
  '/:id',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
  MealController.getSingleMealPlan,
);
export const MealRoutes = router;
