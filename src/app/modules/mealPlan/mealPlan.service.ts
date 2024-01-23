import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  defaultMealCover,
  mealPlanFilterableFields,
} from './mealPlan.constant';
import { IMealPlan, IMealPlanFilters } from './mealPlan.interface';
import { MealPlan } from './mealPlan.model';
import { Meal } from '../meal/meal.model';

const createMealPlan = async (payload: IMealPlan) => {
  const { mealPlan_cover } = payload;
  // set meal cover when it's not given
  !mealPlan_cover
    ? (payload.mealPlan_cover = defaultMealCover)
    : (payload.mealPlan_cover = mealPlan_cover);
  const result = (await MealPlan.create(payload)).populate('trainer');
  return result;
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
  const result = await MealPlan.findById(id).populate('trainer');
  return result;
};

const getMealsByMealPlan = async (id: string, meal_category: string) => {
  const query = { mealPlan: id };
  if (meal_category) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    query['meal_category'] = meal_category;
  }

  const result = await Meal.find(query);
  return result;
};

export const MealPlanService = {
  createMealPlan,
  getAllMealPlans,
  getSingleMealPlan,
  getMealsByMealPlan,
};
