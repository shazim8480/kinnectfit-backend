import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENU_USER_ROLE } from '../../../enums/user';
import { WorkoutValidation } from './workout.validation';
import { WorkoutController } from './workout.controller';
const router = express.Router();
router.post(
  '/create-workout',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
  validateRequest(WorkoutValidation.createZodWorkoutSchema),
  WorkoutController.createWorkout,
);
router.get(
  '/workouts',
  // auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
  WorkoutController.getAllWorkouts,
);
router.get(
  '/:id',
  // auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
  WorkoutController.getSingleWorkout,
);
export const WorkoutRoutes = router;
