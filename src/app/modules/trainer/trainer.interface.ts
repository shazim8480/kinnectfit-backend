import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type ITrainer = {
  height: number;
  weight: number;
  age: number;
  bmi: number;
  images?: string[];
  user: Types.ObjectId | IUser;
};
