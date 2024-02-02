export type gender = 'Male' | 'Female';
export const userGender: gender[] = ['Male', 'Female'];
export type set_goal =
  | 'Lose Weight'
  | 'Gain Weight'
  | 'Gain Muscle'
  | 'Maintain Weight';

export const userGoal: set_goal[] = [
  'Lose Weight',
  'Gain Weight',
  'Gain Muscle',
  'Maintain Weight',
];
export type set_plan = '7 days' | '15 days' | '30 days' | '60 days';

export const userPlan: set_plan[] = ['7 days', '15 days', '30 days', '60 days'];
