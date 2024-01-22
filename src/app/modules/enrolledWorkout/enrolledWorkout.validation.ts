import { z } from 'zod';
const createZodEnrolledWorkoutSchema = z.object({
  body: z.object({
    modules: z
      .object({
        module_name: z.string({
          required_error: 'Module name is required',
        }),
        module_time: z.string({
          required_error: 'Module time is required',
        }),
        isCompleted: z.boolean({}).optional(),
      })
      .array(),
    user: z.string({
      required_error: 'User is required',
    }),
  }),
});

export const EnrolledWorkoutValidation = {
  createZodEnrolledWorkoutSchema,
};
