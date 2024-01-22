import { IEnrolledWorkout } from './enrolledWorkout.interface';
import { EnrolledWorkout } from './enrolledWorkout.model';

const createEnrolledWorkout = async (payload: IEnrolledWorkout) => {
  const result = (await EnrolledWorkout.create(payload)).populate([
    {
      path: 'user',
    },
  ]);
  return result;
};

const getAllEnrolledWorkouts = async () => {
  const result = await EnrolledWorkout.find({}).populate([
    {
      path: 'user',
    },
  ]);
  return result;
};

const getSingleEnrolledWorkout = async (id: string) => {
  const result = await EnrolledWorkout.findById(id).populate([
    {
      path: 'user',
    },
  ]);
  return result;
};

const getEnrolledWorkoutModulesByUser = async (
  id: string,
  // meal_category: string,
) => {
  const query = { user: id };
  // if (meal_category) {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-expect-error
  //   query['meal_category'] = meal_category;
  // }

  const result = await EnrolledWorkout.find(query);
  return result;
};

export const EnrolledWorkoutService = {
  createEnrolledWorkout,
  getAllEnrolledWorkouts,
  getSingleEnrolledWorkout,
  getEnrolledWorkoutModulesByUser,
};
