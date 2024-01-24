import { Request, Response } from 'express';
import { TrainerService } from './trainer.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const trainerRequest = catchAsync(async (req: Request, res: Response) => {
  const { ...trainerData } = req.body;
  const result = await TrainerService.trainerRequest(trainerData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Requested for becoming a trainer',
    data: result,
  });
});
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

const getSingleTrainer = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await TrainerService.getSingleTrainer(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  });
});

export const TrainerController = {
  createTrainer,
  getAllTrainers,
  getSingleTrainer,
  trainerRequest,
};
