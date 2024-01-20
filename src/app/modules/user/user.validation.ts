import { z } from 'zod';
import { userRoles } from './user.constant';
const createZodUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Please enter your name',
    }),
    password: z.string({
      required_error: 'Please enter your password',
    }),
    email: z
      .string({ required_error: 'Please enter your email address' })
      .email(),
    role: z.enum([...userRoles] as [string, ...string[]]).optional(),
    img_url: z.string().optional(),
  }),
});

export const UserValidation = {
  createZodUserSchema,
};
