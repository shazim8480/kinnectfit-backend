import { Request, Response } from 'express';
import { MealPlanService } from './mealPlan.service';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { mealPlanFilterableFields } from './mealPlan.constant';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
const createMealPlan = catchAsync(async (req: Request, res: Response) => {
  const { ...mealPlanData } = req.body;
  const result = await MealPlanService.createMealPlan(mealPlanData);
  res.status(200).json({
    message: 'Meal Plan created successfully',
    data: result,
  });
});

const getAllMealPlans = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, mealPlanFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await MealPlanService.getAllMealPlans(
    filters,
    paginationOptions,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Meal Plans fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const MealPlanController = {
  createMealPlan,
  getAllMealPlans,
};
