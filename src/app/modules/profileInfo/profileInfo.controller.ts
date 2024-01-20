import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ProfileInfoService } from './profileInfo.service';
const createProfileInfo = catchAsync(async (req: Request, res: Response) => {
  const { ...profileInfoData } = req.body;
  const result = await ProfileInfoService.createProfileInfo(profileInfoData);
  res.status(200).json({
    message: 'Profile Info created successfully',
    data: result,
  });
});

export const ProfileInfoController = {
  createProfileInfo,
};
