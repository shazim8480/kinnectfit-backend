import httpStatus from 'http-status';
import { IProfileInfo } from './profileInfo.interface';
import { ProfileInfo } from './profileInfo.model';
import ApiError from '../../../errors/ApiError';

const createProfileInfo = async (payload: IProfileInfo) => {
  const isExist = await ProfileInfo.find({ user: payload.user });
  // console.log('isExist', isExist);
  if (isExist.length !== 0) {
    throw new ApiError(httpStatus.CONFLICT, 'User profile is already updated');
  }
  const result = (await ProfileInfo.create(payload)).populate('user');
  return result;
};

export const ProfileInfoService = {
  createProfileInfo,
};
