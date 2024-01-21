import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENU_USER_ROLE } from '../../../enums/user';
import { WorkoutModuleValidation } from './workoutModule.validation';
import { WorkoutModuleController } from './workoutModule.controller';

const router = express.Router();
router.post(
  '/create',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
  validateRequest(WorkoutModuleValidation.createZodWorkoutModuleSchema),
  WorkoutModuleController.createWorkoutModule,
);
router.get(
  '/all-modules',
  // auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
  WorkoutModuleController.getAllWorkoutModules,
);
router.get(
  '/:id',
  // auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
  WorkoutModuleController.getSingleWorkoutModule,
);
router.get(
  '/workout/:id',
  // auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
  WorkoutModuleController.getWorkoutModulesByWorkout,
);
export const WorkoutModuleRoutes = router;
