import { z } from 'zod';
import { userGender, userGoal, userPlan } from './profileInfo.constant';
const createZodProfileInfoSchema = z.object({
  body: z.object({
    height: z.number({
      required_error: 'Please enter your height',
    }),
    weight: z.number({
      required_error: 'Please enter your weight',
    }),
    goal_weight: z.number({
      required_error: 'Please enter your goal weight',
    }),
    age: z.number({
      required_error: 'Please enter your age',
    }),
    country: z.string({
      required_error: 'Please choose your country',
    }),
    gender: z.enum([...userGender] as [string, ...string[]], {
      required_error: 'Please choose your gender',
    }),
    set_goal: z.enum([...userGoal] as [string, ...string[]], {
      required_error: 'Please set your goal',
    }),
    set_plan: z.enum([...userPlan] as [string, ...string[]], {
      required_error: 'Please set your plan',
    }),
    user: z.string({
      required_error: 'User is required',
    }),
  }),
});

export const ProfileInfoValidation = {
  createZodProfileInfoSchema,
};
