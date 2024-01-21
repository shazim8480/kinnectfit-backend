import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IMeal } from '../meal/meal.interface';

export type ISelectedMeals = {
  user: Types.ObjectId | IUser;
  selected_meals: Types.ObjectId | IMeal;
};
