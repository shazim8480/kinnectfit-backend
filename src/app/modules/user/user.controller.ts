import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import config from '../../../config';
import sendResponse from '../../../shared/sendResponse';
import { paginationFields } from '../../../constants/pagination';
import pick from '../../../shared/pick';
import { userFilterableFields } from './user.constant';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const resultWithRefreshToken = await UserService.createUser(userData);
  const { refreshToken, ...result } = resultWithRefreshToken;
  // set refresh token into cookies
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User is created successfully`,
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const resultWithRefreshToken = await UserService.loginUser(req.body);
  const { refreshToken, ...result } = resultWithRefreshToken;
  // set refresh token into cookies
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await UserService.refreshToken(refreshToken);
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  //set refresh token into cookies
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token get successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users retrieved Successfully!',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await UserService.getSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  });
});
const getTrainerByUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getTrainerByUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Trainer retrieved successfully by user id!',
    data: result,
  });
});

export const UserController = {
  createUser,
  loginUser,
  refreshToken,
  getAllUsers,
  getSingleUser,
  getTrainerByUser,
};
