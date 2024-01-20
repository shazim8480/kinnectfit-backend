import { Request, Response } from 'express';
import { TrainerService } from './trainer.service';
import catchAsync from '../../../shared/catchAsync';

const createTrainer = catchAsync(async (req: Request, res: Response) => {
  const { ...trainerData } = req.body;
  const result = await TrainerService.createTrainer(trainerData);
  res.status(200).json({
    message: 'Trainer created successfully',
    data: result,
  });
});

export const TrainerController = {
  createTrainer,
};
