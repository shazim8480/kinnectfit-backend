import { z } from 'zod';
const createZodSelectedMealsSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'User is required',
    }),
    selected_meals: z.string({
      required_error: 'Meals selection is required',
    }),
  }),
});

export const SelectedMealsValidation = {
  createZodSelectedMealsSchema,
};
