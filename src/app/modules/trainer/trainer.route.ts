import express from 'express';
import { TrainerController } from './trainer.controller';
const router = express.Router();
router.post('/create-trainer', TrainerController.createTrainer);
export const TrainerRoutes = router;
