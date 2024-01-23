import { Request, Response } from 'express';
import { TrainerService } from './trainer.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createTrainer = catchAsync(async (req: Request, res: Response) => {
  const { ...trainerData } = req.body;
  const result = await TrainerService.createTrainer(trainerData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainer created successfully',
    data: result,
  });
});

const getAllTrainers = catchAsync(async (req: Request, res: Response) => {
  const result = await TrainerService.getAllTrainers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All trainers fetched successfully',
    data: result,
  });
});

export const TrainerController = {
  createTrainer,
  getAllTrainers,
};
