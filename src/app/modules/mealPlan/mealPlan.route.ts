import express from 'express';
import { MealPlanController } from './mealPlan.controller';
import validateRequest from '../../middlewares/validateRequest';
import { MealPlanValidation } from './mealPlan.validation';
import auth from '../../middlewares/auth';
import { ENU_USER_ROLE } from '../../../enums/user';
const router = express.Router();
router.post(
  '/create-mealplan',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
  validateRequest(MealPlanValidation.createZodMealPlanSchema),
  MealPlanController.createMealPlan,
);
router.get(
  '/mealplans',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER, ENU_USER_ROLE.USER),
  MealPlanController.getAllMealPlans,
);
router.get(
  '/:id',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER, ENU_USER_ROLE.USER),
  MealPlanController.getSingleMealPlan,
);
router.get(
  '/meals/:id',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER, ENU_USER_ROLE.USER),
  MealPlanController.getMealsByMealPlan,
);
export const MealPlanRoutes = router;
