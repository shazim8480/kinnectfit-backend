/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  defaultMealPlanCover,
  mealPlanFilterableFields,
} from './mealPlan.constant';
import { IMealPlan, IMealPlanFilters } from './mealPlan.interface';
import { MealPlan } from './mealPlan.model';
import { Meal } from '../meal/meal.model';
import { Trainer } from '../trainer/trainer.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createMealPlan = async (payload: IMealPlan) => {
  // set meal plan cover when it's not given
  const defaultImg = [];
  defaultImg.push(defaultMealPlanCover);
  !payload.mealPlan_cover || payload.mealPlan_cover?.length === 0
    ? (payload.mealPlan_cover = defaultImg)
    : // eslint-disable-next-line no-self-assign
      (payload.mealPlan_cover = payload.mealPlan_cover);

  const trainerExist = await Trainer.findById(payload.trainer);

  if (!trainerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trainer does not exist');
  } else if (trainerExist && trainerExist.status === 'pending') {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Trainer must need to be approved to create meal plan.',
    );
  } else if (trainerExist && trainerExist.status === 'approved') {
    const result = (await MealPlan.create(payload)).populate('trainer');
    return result;
  }
};

const getAllMealPlans = async (
  filters: IMealPlanFilters,
  paginationOptions: IPaginationOptions,
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: mealPlanFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await MealPlan.find(whereConditions)
    .populate('trainer')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await MealPlan.countDocuments(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleMealPlan = async (id: string) => {
  const result = await MealPlan.findById(id).populate({
    path: 'trainer',
    populate: {
      path: 'user',
    },
  });
  return result;
};

const getMealsByMealPlan = async (id: string) => {
  try {
    const meals = await Meal.find({ mealPlan: id }).lean().exec();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const organizedMeals: any = {};

    meals.forEach(meal => {
      const category = meal.meal_category;

      // If the category doesn't exist in the organizedMeals object, create an array for it
      if (!organizedMeals[category]) {
        organizedMeals[category] = [];
      }

      // Push the current meal to the corresponding category array
      organizedMeals[category].push(meal);
    });

    return organizedMeals;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const MealPlanService = {
  createMealPlan,
  getAllMealPlans,
  getSingleMealPlan,
  getMealsByMealPlan,
};
