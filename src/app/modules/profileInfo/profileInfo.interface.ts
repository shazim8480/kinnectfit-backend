import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { gender, set_goal, set_plan } from './profileInfo.constant';

export type IProfileInfo = {
  height: number;
  weight: number;
  goal_weight: number;
  age: number;
  gender: gender;
  country: string;
  set_goal: set_goal;
  set_plan: set_plan;
  user: Types.ObjectId | IUser;
};
