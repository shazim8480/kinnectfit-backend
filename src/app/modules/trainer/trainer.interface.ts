import { Types } from "mongoose";

export interface ITrainer {
  height: number;
  weight: number;
  age: number;
  bmi: number;
  images?: string[];
}
