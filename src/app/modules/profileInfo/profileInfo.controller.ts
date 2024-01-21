import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ProfileInfoService } from './profileInfo.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
const createProfileInfo = catchAsync(async (req: Request, res: Response) => {
  const { ...profileInfoData } = req.body;
  const result = await ProfileInfoService.createProfileInfo(profileInfoData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile Info created successfully',
    data: result,
  });
});

export const ProfileInfoController = {
  createProfileInfo,
};
