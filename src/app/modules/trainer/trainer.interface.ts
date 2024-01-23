import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type ITrainer = {
  height: string;
  weight: string;
  age: string;
  bmi: string;
  images?: string[];
  user: Types.ObjectId | IUser;
};
