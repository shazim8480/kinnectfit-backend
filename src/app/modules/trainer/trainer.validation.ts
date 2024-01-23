import { z } from 'zod';
const createZodTrainerSchema = z.object({
  body: z.object({
    height: z.string({
      required_error: 'Please enter your height',
    }),
    weight: z.string({
      required_error: 'Please enter your weight',
    }),
    age: z.string({
      required_error: 'Please enter your age',
    }),
    bmi: z.string({
      required_error: 'Please enter your BMI',
    }),
    images: z.string().array().optional(),
  }),
});

export const TrainerValidation = {
  createZodTrainerSchema,
};
