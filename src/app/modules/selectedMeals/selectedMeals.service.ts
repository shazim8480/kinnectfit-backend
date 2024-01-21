import { ISelectedMeals } from './selectedMeals.interface';
import { SelectedMeals } from './selectedMeals.model';

const createSelectedMeals = async (payload: ISelectedMeals) => {
  const result = (await SelectedMeals.create(payload)).populate([
    {
      path: 'selected_meals',
    },
    {
      path: 'user',
    },
  ]);
  return result;
};

const getAllSelectedMeals = async () => {
  const result = await SelectedMeals.find({}).populate([
    {
      path: 'selected_meals',
    },
    {
      path: 'user',
    },
  ]);

  return result;
};

const getSingleSelectedMeal = async (id: string) => {
  const result = await SelectedMeals.findById(id).populate([
    {
      path: 'selected_meals',
    },
    {
      path: 'user',
    },
  ]);
  return result;
};
const getSelectedMealsByUserId = async (id: string) => {
  const result = await SelectedMeals.find({ user: id }).populate([
    {
      path: 'selected_meals',
    },
    {
      path: 'user',
    },
  ]);
  return result;
};

export const SelectedMealsService = {
  createSelectedMeals,
  getAllSelectedMeals,
  getSingleSelectedMeal,
  getSelectedMealsByUserId,
};
