import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ReviewService } from './review.service';
const createReview = catchAsync(async (req: Request, res: Response) => {
  const { ...reviewData } = req.body;
  const result = await ReviewService.createReview(reviewData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getAllReviews();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All reviews fetched successfully',
    data: result,
  });
});

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.getSingleReview(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single review fetched successfully',
    data: result,
  });
});

const getReviewsByMealPlan = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.getReviewsByMealPlan(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fetched by meal plan successfully',
    data: result,
  });
});
const getReviewsByWorkout = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.getReviewsByWorkout(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fetched by workout successfully',
    data: result,
  });
});
const getReviewsByApp = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getReviewsByApp();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fetched by app successfully',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getAllReviews,
  getSingleReview,
  getReviewsByMealPlan,
  getReviewsByWorkout,
  getReviewsByApp,
};
