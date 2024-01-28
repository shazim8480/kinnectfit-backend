import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ISelectedMeals } from './selectedMeals.interface';
import { SelectedMeals } from './selectedMeals.model';
import { Meal } from '../meal/meal.model';

const createSelectedMeals = async (payload: ISelectedMeals) => {
  // Check if the user is valid user
  const userExist = await User.findById(payload.user);
  if (!userExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No user found');
  }

  // Filter out items that do not exist in the Meal collection
  const validMealIds = await Meal.find({
    _id: { $in: payload.selected_meals },
  }).distinct('_id');

  // Check if all selected meals exist in the Meal collection
  if (validMealIds.length !== payload.selected_meals.length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'One or more selected meals do not exist',
    );
  }

  // Check if any of the selected meals have already been selected by the user
  const existingSelectedMeals = await SelectedMeals.findOne({
    user: payload.user,
    selected_meals: { $in: validMealIds },
  });

  if (existingSelectedMeals) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'User has already selected some of the meals',
    );
  }

  // Combine new selected meals with olds
  const filteredSelectedMeals = {
    user: payload.user,
    selected_meals: validMealIds,
  };

  let existUserSelectedMeals = await SelectedMeals.findOne({
    user: payload.user,
  });
  if (existUserSelectedMeals) {
    existUserSelectedMeals.selected_meals = [
      ...existUserSelectedMeals.selected_meals,
      ...validMealIds,
    ];
    await existUserSelectedMeals.save();
  } else {
    existUserSelectedMeals = await SelectedMeals.create(filteredSelectedMeals);
  }
  const result = await existUserSelectedMeals.populate([
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
