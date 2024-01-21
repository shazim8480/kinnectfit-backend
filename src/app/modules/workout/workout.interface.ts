import { Types } from 'mongoose';
import { ITrainer } from '../trainer/trainer.interface';

export type IWorkout = {
  workout_name: string;
  workout_cover?: string[];
  workout_category: string;
  total_workout_time: string;
  workout_description: string;
  trainer: Types.ObjectId | ITrainer;
};

export type IWorkoutFilters = {
  searchTerm?: string;
  workout_name?: string;
  workout_category?: string;
};
