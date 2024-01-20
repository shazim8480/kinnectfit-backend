import express from 'express';
import { MealPlanController } from './mealPlan.controller';
const router = express.Router();
router.post('/create-mealplan', MealPlanController.createMealPlan);
export const MealPlanRoutes = router;
