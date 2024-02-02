import { IMealCategories } from './meal.interface';

export const mealDefaultImg =
  'https://images.unsplash.com/photo-1617460182733-e555b2ce5ede?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
export const MealCategories: IMealCategories[] = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
];
export const mealFilterableFields = [
  'searchTerm',
  'meal_name',
  'meal_category',
];
