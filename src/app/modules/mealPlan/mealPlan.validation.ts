import { z } from 'zod';
const createZodMealPlanSchema = z.object({
  body: z.object({
    mealPlan_name: z.string({
      required_error: 'Please give a plan name',
    }),
    mealPlan_description: z.string({
      required_error: 'Please give plan description',
    }),
    mealPlan_category: z.string({
      required_error: 'Please give plan category name',
    }),
    mealPlan_cover: z.string().optional(),
    trainer: z.string({
      required_error: 'Trainer is required',
    }),
  }),
});

export const MealPlanValidation = {
  createZodMealPlanSchema,
};
