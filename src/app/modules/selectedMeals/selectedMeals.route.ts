import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SelectedMealsValidation } from './selectedMeals.validation';
import { SelectedMealsController } from './selectedMeals.controller';
const router = express.Router();
router.post(
  '/select-meal',
  validateRequest(SelectedMealsValidation.createZodSelectedMealsSchema),
  SelectedMealsController.createSelectedMeals,
);
router.get('/selected-meals', SelectedMealsController.getAllSelectedMeals);
router.get('/selected-meal/:id', SelectedMealsController.getSingleSelectedMeal);
router.get('/user-meals/:id', SelectedMealsController.getSelectedMealsByUserId);
export const SelectedMealsRoutes = router;
