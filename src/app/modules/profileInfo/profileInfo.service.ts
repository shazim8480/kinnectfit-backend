import { IProfileInfo } from './profileInfo.interface';
import { ProfileInfo } from './profileInfo.model';

const createProfileInfo = async (payload: IProfileInfo) => {
  const result = await ProfileInfo.create(payload);
  return result;
};

export const ProfileInfoService = {
  createProfileInfo,
};
