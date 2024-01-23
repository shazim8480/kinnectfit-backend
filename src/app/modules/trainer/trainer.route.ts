import express from 'express';
import { TrainerController } from './trainer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { TrainerValidation } from './trainer.validation';
import auth from '../../middlewares/auth';
import { ENU_USER_ROLE } from '../../../enums/user';
const router = express.Router();
router.post(
  '/create-trainer',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.USER),
  validateRequest(TrainerValidation.createZodTrainerSchema),
  TrainerController.createTrainer,
);
router.get(
  '/trainers',
  auth(ENU_USER_ROLE.ADMIN),
  TrainerController.getAllTrainers,
);
export const TrainerRoutes = router;
