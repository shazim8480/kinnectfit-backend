import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { SelectedMealsService } from './selectedMeals.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
// import { MealService } from './meal.service';
const createSelectedMeals = catchAsync(async (req: Request, res: Response) => {
  const { ...selectedMealsData } = req.body;
  const result =
    await SelectedMealsService.createSelectedMeals(selectedMealsData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Meals selected successfully',
    data: result,
  });
});

const getAllSelectedMeals = catchAsync(async (req: Request, res: Response) => {
  const result = await SelectedMealsService.getAllSelectedMeals();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Selected meals fetched successfully',
    data: result,
  });
});

const getSingleSelectedMeal = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SelectedMealsService.getSingleSelectedMeal(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single selected meal fetched successfully',
      data: result,
    });
  },
);

const getSelectedMealsByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await SelectedMealsService.getSelectedMealsByUserId(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Selected meals fetched by user id',
      data: result,
    });
  },
);

export const SelectedMealsController = {
  createSelectedMeals,
  getAllSelectedMeals,
  getSingleSelectedMeal,
  getSelectedMealsByUserId,
};
