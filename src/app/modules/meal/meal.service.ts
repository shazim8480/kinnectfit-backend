import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IMeal, IMealFilters } from './meal.interface';
import { mealDefaultImg, mealFilterableFields } from './meal.constant';
import { Meal } from './meal.model';
import { MealPlan } from '../mealPlan/mealPlan.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Trainer } from '../trainer/trainer.model';

const createMeal = async (payload: IMeal) => {
  // set meal cover when it's not given
  const defaultImg = [];
  defaultImg.push(mealDefaultImg);
  !payload.meal_cover || payload.meal_cover?.length === 0
    ? (payload.meal_cover = defaultImg)
    : // eslint-disable-next-line no-self-assign
      (payload.meal_cover = payload.meal_cover);
  const isMealPlanExist = await MealPlan.findById(payload.mealPlan);
  const isTrainerExist = await Trainer.findById(payload.trainer);
  if (!isMealPlanExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Meal plan does not exist');
  }
  if (!isTrainerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trainer does not exist');
  } else if (
    (isTrainerExist && isTrainerExist.status === 'pending') ||
    (isTrainerExist && isTrainerExist.status === 'paused')
  ) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Trainer must need to be approved to create meal.',
    );
  }
  const result = (await Meal.create(payload)).populate([
    {
      path: 'mealPlan',
    },
    {
      path: 'trainer',
    },
  ]);
  return result;
};

const getAllMeals = async (
  filters: IMealFilters,
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
      $or: mealFilterableFields.map(field => ({
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

  const result = await Meal.find(whereConditions)
    .populate('mealPlan')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Meal.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleMeal = async (id: string) => {
  const result = await Meal.findById(id).populate('mealPlan');
  return result;
};
const getMealsByTrainer = async (id: string) => {
  const isTrainerExist = await Trainer.findById(id);
  // console.log('🚀 isTrainerExist', isTrainerExist);
  if (!isTrainerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trainer not found');
  }
  const result = await Meal.find({ trainer: id }).populate([
    {
      path: 'mealPlan',
    },
    {
      path: 'trainer',
    },
  ]);
  return result;
};

export const MealService = {
  createMeal,
  getAllMeals,
  getSingleMeal,
  getMealsByTrainer,
};
