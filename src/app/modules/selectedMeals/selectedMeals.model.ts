import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { ISelectedMeals } from './selectedMeals.interface';

const selectedMealsSchema = new Schema<ISelectedMeals>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    selected_meals: {
      type: Schema.Types.ObjectId,
      ref: 'Meal',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// 3. Create a Meal  Model.
export const SelectedMeals = model<ISelectedMeals>(
  'SelectedMeals',
  selectedMealsSchema,
);
