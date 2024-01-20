import { z } from 'zod';
const createZodTrainerSchema = z.object({
  body: z.object({
    height: z.number({
      required_error: 'Please enter your height',
    }),
    weight: z.number({
      required_error: 'Please enter your weight',
    }),
    age: z.number({
      required_error: 'Please enter your age',
    }),
    bmi: z.number({
      required_error: 'Please enter your BMI',
    }),
    images: z.string().array().optional(),
  }),
});

export const TrainerValidation = {
  createZodTrainerSchema,
};
