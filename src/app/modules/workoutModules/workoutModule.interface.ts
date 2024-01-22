import { Types } from 'mongoose';
import { IWorkout } from '../workout/workout.interface';
import { ITrainer } from '../trainer/trainer.interface';

export type IWorkoutModule = {
  modules: IModule[];
  workout: Types.ObjectId | IWorkout;
  trainer: Types.ObjectId | ITrainer;
};
export type IModule = {
  module_name: string;
  module_time: string;
  isCompleted: boolean;
};
