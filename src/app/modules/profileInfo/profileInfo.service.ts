import { IProfileInfo } from './profileInfo.interface';
import { ProfileInfo } from './profileInfo.model';

const createProfileInfo = async (payload: IProfileInfo) => {
  const result = (await ProfileInfo.create(payload)).populate('user');
  return result;
};

export const ProfileInfoService = {
  createProfileInfo,
};
