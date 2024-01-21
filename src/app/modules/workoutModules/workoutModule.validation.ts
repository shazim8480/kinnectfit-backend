import { z } from 'zod';
const createZodWorkoutModuleSchema = z.object({
  body: z.object({
    modules: z
      .object({
        module_name: z.string({
          required_error: 'Module name is required',
        }),
        module_time: z.string({
          required_error: 'Module time is required',
        }),
      })
      .array(),
    workout: z.string({
      required_error: 'Workout is required',
    }),
    trainer: z.string({
      required_error: 'Trainer is required',
    }),
  }),
});

export const WorkoutModuleValidation = {
  createZodWorkoutModuleSchema,
};
