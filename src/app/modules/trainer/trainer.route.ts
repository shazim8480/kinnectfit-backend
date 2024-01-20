import express from 'express';
import { TrainerController } from './trainer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { TrainerValidation } from './trainer.validation';
const router = express.Router();
router.post(
  '/create-trainer',
  validateRequest(TrainerValidation.createZodTrainerSchema),
  TrainerController.createTrainer,
);
export const TrainerRoutes = router;
