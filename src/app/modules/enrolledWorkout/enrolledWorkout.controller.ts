import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { EnrolledWorkoutService } from './enrolledWorkout.service';
const createEnrolledWorkout = catchAsync(
  async (req: Request, res: Response) => {
    const { ...enrolledWorkoutData } = req.body;
    const result =
      await EnrolledWorkoutService.createEnrolledWorkout(enrolledWorkoutData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Workout modules enrolled successfully',
      data: result,
    });
  },
);

const getAllEnrolledWorkouts = catchAsync(
  async (req: Request, res: Response) => {
    const result = await EnrolledWorkoutService.getAllEnrolledWorkouts();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All enrolled workout modules fetched successfully',
      data: result,
    });
  },
);

const getSingleEnrolledWorkout = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await EnrolledWorkoutService.getSingleEnrolledWorkout(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single enrolled workout module fetched successfully',
      data: result,
    });
  },
);
const getEnrolledWorkoutModulesByUser = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await EnrolledWorkoutService.getEnrolledWorkoutModulesByUser(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Workout modules fetched successfully by user id',
      data: result,
    });
  },
);

export const EnrolledWorkoutController = {
  createEnrolledWorkout,
  getAllEnrolledWorkouts,
  getSingleEnrolledWorkout,
  getEnrolledWorkoutModulesByUser,
};
