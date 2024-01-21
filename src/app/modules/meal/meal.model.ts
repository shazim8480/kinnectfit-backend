import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { IMeal } from './meal.interface';
import { MealCategories } from './meal.constant';

const mealSchema = new Schema<IMeal>(
  {
    meal_name: { type: String, required: true },
    meal_category: { type: String, enum: MealCategories, required: true },
    meal_cover: { type: String },
    protein: { type: String, required: true },
    carbs: { type: String, required: true },
    fat: { type: String, required: true },
    prep_time: { type: String, required: true },
    ingredients: { type: [String], required: true },
    mealPlan: { type: Schema.Types.ObjectId, ref: 'MealPlan', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// 3. Create a Meal  Model.
export const Meal = model<IMeal>('Meal', mealSchema);
