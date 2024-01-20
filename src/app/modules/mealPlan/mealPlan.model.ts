import { Schema } from 'mongoose';
import { IMealPlan } from './mealPlan.interface';
import { model } from 'mongoose';

const mealPlanSchema = new Schema<IMealPlan>(
  {
    trainer: { type: Schema.Types.ObjectId, ref: 'Trainer', required: true },
    mealPlan_name: { type: String, required: true },
    mealPlan_description: { type: String, required: true },
    mealPlan_category: { type: String, required: true },
    mealPlan_cover: { type: String },
  },
  {
    timestamps: true,
  },
);

// 3. Create a Meal Plan Model.
export const MealPlan = model<IMealPlan>('MealPlan', mealPlanSchema);
