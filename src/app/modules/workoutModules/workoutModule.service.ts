import { IWorkoutModule } from './workoutModule.interface';
import { WorkoutModule } from './workoutModule.model';

const createWorkoutModule = async (payload: IWorkoutModule) => {
  const result = (await WorkoutModule.create(payload)).populate([
    {
      path: 'workout',
    },
    {
      path: 'trainer',
      populate: [
        {
          path: 'user',
        },
      ],
    },
  ]);
  return result;
};

const getAllWorkoutModules = async () => {
  const result = await WorkoutModule.find({}).populate([
    {
      path: 'workout',
    },
    {
      path: 'trainer',
      populate: [
        {
          path: 'user',
        },
      ],
    },
  ]);
  return result;
};

const getSingleWorkoutModule = async (id: string) => {
  const result = await WorkoutModule.findById(id).populate([
    {
      path: 'workout',
    },
    {
      path: 'trainer',
      populate: [
        {
          path: 'user',
        },
      ],
    },
  ]);
  return result;
};

const getWorkoutModulesByWorkout = async (
  id: string,
  // meal_category: string,
) => {
  const query = { workout: id };
  // if (meal_category) {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-expect-error
  //   query['meal_category'] = meal_category;
  // }

  const result = await WorkoutModule.find(query);
  return result;
};

export const WorkoutModuleService = {
  createWorkoutModule,
  getAllWorkoutModules,
  getSingleWorkoutModule,
  getWorkoutModulesByWorkout,
};
