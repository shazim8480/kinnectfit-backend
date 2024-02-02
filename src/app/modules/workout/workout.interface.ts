import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IWorkout = {
  workout_name: string;
  workout_cover?: string[];
  workout_category: string;
  total_workout_time: string;
  workout_description: string;
  trainer: Types.ObjectId | IUser;
};

export type IWorkoutFilters = {
  searchTerm?: string;
  workout_name?: string;
  workout_category?: string | string[];
};
