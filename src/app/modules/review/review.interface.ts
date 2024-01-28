import { Types } from 'mongoose';
import { IReviewType } from './review.constant';
import { IMealPlan } from '../mealPlan/mealPlan.interface';
import { IUser } from '../user/user.interface';

export type IReview = {
  review_item_name?: string;
  review_type: IReviewType;
  review_description: string;
  rating: number;
  review_cover?: string[];
  workout?: Types.ObjectId;
  mealPlan?: Types.ObjectId | IMealPlan;
  user: Types.ObjectId | IUser;
};
