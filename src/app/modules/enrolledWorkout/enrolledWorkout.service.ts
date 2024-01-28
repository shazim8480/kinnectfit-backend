import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IEnrolledWorkout } from './enrolledWorkout.interface';
import { EnrolledWorkout } from './enrolledWorkout.model';

const createEnrolledWorkout = async (payload: IEnrolledWorkout) => {
  // Check if the user exist
  const isUserExist = await User.findById(payload.user);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // Find and update existing enrolled workout document
  let result = await EnrolledWorkout.findOneAndUpdate(
    { user: payload.user },
    { $push: { modules: { $each: payload.modules } } },
    { new: true },
  );

  // Create a new document if not found
  if (!result) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    result = (await EnrolledWorkout.create(payload)).populate([
      { path: 'user' },
    ]);
  }

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

const getEnrolledWorkoutModulesByUser = async (id: string) => {
  const query = { user: id };
  const result = await EnrolledWorkout.find(query);
  return result;
};

export const EnrolledWorkoutService = {
  createEnrolledWorkout,
  getAllEnrolledWorkouts,
  getSingleEnrolledWorkout,
  getEnrolledWorkoutModulesByUser,
};
