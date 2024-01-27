import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SelectedMealsValidation } from './selectedMeals.validation';
import { SelectedMealsController } from './selectedMeals.controller';
import auth from '../../middlewares/auth';
import { ENU_USER_ROLE } from '../../../enums/user';
const router = express.Router();
router.post(
  '/select',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.USER),
  validateRequest(SelectedMealsValidation.createZodSelectedMealsSchema),
  SelectedMealsController.createSelectedMeals,
);
router.get(
  '/meals',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.USER),
  SelectedMealsController.getAllSelectedMeals,
);
router.get('/meal/:id', SelectedMealsController.getSingleSelectedMeal);
router.get('/user-meals/:id', SelectedMealsController.getSelectedMealsByUserId);
export const SelectedMealsRoutes = router;
