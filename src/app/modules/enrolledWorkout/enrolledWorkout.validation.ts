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
    user: z.string({
      required_error: 'User is required',
    }),
  }),
});

export const EnrolledWorkoutValidation = {
  createZodEnrolledWorkoutSchema,
};
