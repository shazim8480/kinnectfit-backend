import { z } from 'zod';
const createZodEnrolledWorkoutSchema = z.object({
  body: z.object({
    modules: z
      .object({
        module_id: z.string({
          required_error: 'Module id is required',
        }),
        isCompleted: z.boolean({}).optional(),
      })
      .array(),
    total_modules: z.number({
      required_error: 'Total modules is required',
    }),
    user: z.string({
      required_error: 'User is required',
    }),
    workout: z.string({
      required_error: 'Workout is required',
    }),
  }),
});

export const EnrolledWorkoutValidation = {
  createZodEnrolledWorkoutSchema,
};
