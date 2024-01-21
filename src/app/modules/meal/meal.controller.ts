import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { MealService } from './meal.service';
import { mealFilterableFields } from './meal.constant';
const createMeal = catchAsync(async (req: Request, res: Response) => {
  const { ...mealData } = req.body;
  const result = await MealService.createMeal(mealData);
  res.status(200).json({
    message: 'Meal created successfully',
    data: result,
  });
});

const getAllMeals = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, mealFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await MealService.getAllMeals(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Meals fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleMealPlan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MealService.getSingleMeal(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single meal fetched successfully',
    data: result,
  });
});

export const MealController = {
  createMeal,
  getAllMeals,
  getSingleMealPlan,
};
