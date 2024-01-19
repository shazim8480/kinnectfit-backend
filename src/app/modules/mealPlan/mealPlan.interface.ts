import { Types } from "mongoose";
import { ITrainer } from "../trainer/trainer.interface";

export interface IMealPlan {
  trainer: Types.ObjectId | ITrainer;
  mealPlan_name: string;
  mealPlan_description: string;
  mealPlan_category: string;
  mealPlan_cover: string;
}
