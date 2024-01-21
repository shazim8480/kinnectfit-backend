import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { WorkoutService } from './workout.service';
import pick from '../../../shared/pick';
import { workoutFilterableFields } from './workout.constant';
import { paginationFields } from '../../../constants/pagination';
const createWorkout = catchAsync(async (req: Request, res: Response) => {
  const { ...workoutData } = req.body;
  const result = await WorkoutService.createWorkout(workoutData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Workout created successfully',
    data: result,
  });
});

const getAllWorkouts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, workoutFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await WorkoutService.getAllWorkouts(
    filters,
    paginationOptions,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All workouts fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleWorkout = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await WorkoutService.getSingleWorkout(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single workout fetched successfully',
    data: result,
  });
});
// const getMealsByMealPlan = catchAsync(async (req: Request, res: Response) => {
//   const { meal_category } = req.query;
//   const { id } = req.params;

//   const result = await WorkoutService.getAllWorkouts(
//     id,
//     meal_category as string,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Meals fetched successfully by meal plan',
//     data: result,
//   });
// });

export const WorkoutController = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
};
