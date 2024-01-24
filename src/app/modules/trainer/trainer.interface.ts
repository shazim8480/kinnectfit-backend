import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type ITrainer = {
  height: string;
  weight: string;
  age: string;
  bmi: string;
  images?: string[];
  status?: ITrainerStatus;
  user: Types.ObjectId | IUser;
};
export type ICreateTrainer = {
  user: Types.ObjectId | IUser;
};
export type ITrainerStatus = 'pending' | 'paused' | 'approved';
