import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENU_USER_ROLE } from '../../../enums/user';
import { EnrolledWorkoutValidation } from './enrolledWorkout.validation';
import { EnrolledWorkoutController } from './enrolledWorkout.controller';

const router = express.Router();
router.post(
  '/enroll',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.USER),
  validateRequest(EnrolledWorkoutValidation.createZodEnrolledWorkoutSchema),
  EnrolledWorkoutController.createEnrolledWorkout,
);
router.get(
  '/all-modules',
  // auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
  EnrolledWorkoutController.getAllEnrolledWorkouts,
);
router.get(
  '/:id',
  // auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
  EnrolledWorkoutController.getSingleEnrolledWorkout,
);
router.get(
  '/user/:id',
  // auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
  EnrolledWorkoutController.getEnrolledWorkoutModulesByUser,
);
export const EnrolledWorkoutRoutes = router;
