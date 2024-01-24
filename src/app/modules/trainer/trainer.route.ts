import express from 'express';
import { TrainerController } from './trainer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { TrainerValidation } from './trainer.validation';
import auth from '../../middlewares/auth';
import { ENU_USER_ROLE } from '../../../enums/user';
const router = express.Router();
router.post(
  '/trainer-request',
  auth(ENU_USER_ROLE.USER),
  validateRequest(TrainerValidation.createZodTrainerSchema),
  TrainerController.trainerRequest,
);
router.post(
  '/create-trainer',
  auth(ENU_USER_ROLE.ADMIN),
  // validateRequest(TrainerValidation.createZodTrainerSchema),
  TrainerController.createTrainer,
);
router.get(
  '/trainers',
  auth(ENU_USER_ROLE.ADMIN),
  TrainerController.getAllTrainers,
);
router.get(
  '/:id',
  auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
  TrainerController.getSingleTrainer,
);
export const TrainerRoutes = router;
