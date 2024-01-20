import { Types } from 'mongoose';
import { ITrainer } from '../trainer/trainer.interface';

export type IMealPlan = {
  mealPlan_name: string;
  mealPlan_description: string;
  mealPlan_category: string;
  mealPlan_cover: string;
  trainer: Types.ObjectId | ITrainer;
};
