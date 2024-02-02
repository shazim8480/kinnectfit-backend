import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { WorkoutModuleService } from './workoutModule.service';
const createWorkoutModule = catchAsync(async (req: Request, res: Response) => {
  const { ...workoutModuleData } = req.body;
  const result =
    await WorkoutModuleService.createWorkoutModule(workoutModuleData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Workout modules created successfully',
    data: result,
  });
});

const getAllWorkoutModules = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkoutModuleService.getAllWorkoutModules();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All workout modules fetched successfully',
    data: result,
  });
});

const getSingleWorkoutModule = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await WorkoutModuleService.getSingleWorkoutModule(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single workout module fetched successfully',
      data: result,
    });
  },
);
const getWorkoutModulesByWorkout = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await WorkoutModuleService.getWorkoutModulesByWorkout(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Workout modules fetched successfully by workout id',
      data: result,
    });
  },
);
const getWorkoutModulesByTrainer = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await WorkoutModuleService.getWorkoutModulesByTrainer(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Workout modules fetched successfully by trainer id',
      data: result,
    });
  },
);

export const WorkoutModuleController = {
  createWorkoutModule,
  getAllWorkoutModules,
  getSingleWorkoutModule,
  getWorkoutModulesByWorkout,
  getWorkoutModulesByTrainer,
};
