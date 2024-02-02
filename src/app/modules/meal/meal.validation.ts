import { z } from 'zod';
import { MealCategories } from './meal.constant';
const createZodMealSchema = z.object({
  body: z.object({
    meal_name: z.string({
      required_error: 'Please give a meal name',
    }),
    meal_category: z
      .enum([...MealCategories] as [string, ...string[]])
      .optional(),
    meal_cover: z.string().array().optional(),

    protein: z.string({
      required_error: 'Please enter protein quantity',
    }),
    carbs: z.string({
      required_error: 'Please enter carbs quantity',
    }),
    fat: z.string({
      required_error: 'Please enter fat quantity',
    }),
    prep_time: z.string({
      required_error: 'Please enter preparation time',
    }),
    ingredients: z
      .string({
        required_error: 'Please add ingredients items',
      })
      .array(),
    mealPlan: z.string({
      required_error: 'Meal plan is required',
    }),
    trainer: z.string({
      required_error: 'Trainer is required',
    }),
  }),
});

export const MealValidation = {
  createZodMealSchema,
};
