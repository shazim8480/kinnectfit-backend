import { z } from 'zod';
const createZodWorkoutSchema = z.object({
  body: z.object({
    workout_name: z.string({
      required_error: 'Please give a workout name',
    }),
    workout_category: z.string({
      required_error: 'Please give  workout category',
    }),
    workout_description: z.string({
      required_error: 'Please give  workout description',
    }),
    total_workout_time: z.string({
      required_error: 'Please enter total workout time',
    }),
    workout_cover: z.string().array().optional(),
    trainer: z.string({
      required_error: 'Trainer is required',
    }),
  }),
});

export const WorkoutValidation = {
  createZodWorkoutSchema,
};
