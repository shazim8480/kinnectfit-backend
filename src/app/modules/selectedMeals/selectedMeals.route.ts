import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SelectedMealsValidation } from './selectedMeals.validation';
import { SelectedMealsController } from './selectedMeals.controller';
const router = express.Router();
router.post(
  '/select',
  validateRequest(SelectedMealsValidation.createZodSelectedMealsSchema),
  SelectedMealsController.createSelectedMeals,
);
router.get('/meals', SelectedMealsController.getAllSelectedMeals);
router.get('/meal/:id', SelectedMealsController.getSingleSelectedMeal);
router.get('/user-meals/:id', SelectedMealsController.getSelectedMealsByUserId);
export const SelectedMealsRoutes = router;
