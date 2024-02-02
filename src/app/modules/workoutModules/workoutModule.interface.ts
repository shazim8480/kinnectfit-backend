import { Types } from 'mongoose';
import { IWorkout } from '../workout/workout.interface';
import { IUser } from '../user/user.interface';

export type IWorkoutModule = {
  modules: IModule[];
  workout: Types.ObjectId | IWorkout;
  trainer: Types.ObjectId | IUser;
};
export type IModule = {
  module_name: string;
  module_time: string;
  isCompleted: boolean;
};
