import { z } from 'zod';
import { reviewTypes } from './review.constant';
const createZodReviewSchema = z.object({
  body: z.object({
    reviewItem_name: z.string({
      required_error: 'Please give a review name',
    }),
    review_type: z.enum([...reviewTypes] as [string, ...string[]], {
      required_error: 'Please choose a review type',
    }),
    review_cover: z.string().array().optional(),
    rating: z.number({
      required_error: 'Please give a rating',
    }),
    mealPlan: z.string({}).optional(),
    workout: z.string({}).optional(),
    user: z.string({
      required_error: 'User is required',
    }),
  }),
});

export const ReviewValidation = {
  createZodReviewSchema,
};
