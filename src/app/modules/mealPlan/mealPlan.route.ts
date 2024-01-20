import express from 'express';
import { MealPlanController } from './mealPlan.controller';
import validateRequest from '../../middlewares/validateRequest';
import { MealPlanValidation } from './mealPlan.validation';
const router = express.Router();
router.post(
  '/create-mealplan',
  validateRequest(MealPlanValidation.createZodMealPlanSchema),
  MealPlanController.createMealPlan,
);
export const MealPlanRoutes = router;
