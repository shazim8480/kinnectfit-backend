import { SortOrder } from 'mongoose';
import { trainerDefaultImg } from '../trainer/trainer.constant';
import { IWorkout, IWorkoutFilters } from './workout.interface';
import { Workout } from './workout.model';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { workoutFilterableFields } from './workout.constant';

const createWorkout = async (payload: IWorkout) => {
  const defaultImg = [];
  defaultImg.push(trainerDefaultImg);
  // set default trainer img when it's missing
  !payload.workout_cover || payload.workout_cover?.length === 0
    ? (payload.workout_cover = defaultImg)
    : // eslint-disable-next-line no-self-assign
      (payload.workout_cover = payload.workout_cover);
  const result = (await Workout.create(payload)).populate('trainer');
  return result;
};

const getAllWorkouts = async (
  filters: IWorkoutFilters,
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
      $or: workoutFilterableFields.map(field => ({
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

  const result = await Workout.find(whereConditions)
    .populate('trainer')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Workout.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleWorkout = async (id: string) => {
  const result = await Workout.findById(id).populate('trainer');
  return result;
};

// const getMealsByMealPlan = async (id: string, meal_category: string) => {
//   const query = { mealPlan: id };
//   if (meal_category) {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-expect-error
//     query['meal_category'] = meal_category;
//   }

//   const result = await Meal.find(query);
//   return result;
// };

export const WorkoutService = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  //   getMealsByMealPlan,
};
