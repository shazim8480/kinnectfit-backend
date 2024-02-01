import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IEnrolledWorkout } from './enrolledWorkout.interface';
import { EnrolledWorkout } from './enrolledWorkout.model';
import { Workout } from '../workout/workout.model';

const createEnrolledWorkout = async (payload: IEnrolledWorkout) => {
  // Check if the user exist
  const isUserExist = await User.findById(payload.user);
  const isWorkoutExist = await Workout.findById(payload.workout);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (!isWorkoutExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workout does not exist');
  }
  const isEnrollUserExist = await EnrolledWorkout.findOne({
    user: payload.user,
  });
  const isEnrollWorkoutExist = await EnrolledWorkout.findOne({
    workout: payload.workout,
  });

  // if user exist but workout new

  let result;
  if (isEnrollUserExist && !isEnrollWorkoutExist) {
    result = (await EnrolledWorkout.create(payload)).populate([
      { path: 'user' },
      {
        path: 'workout',
      },
    ]);
  }

  // Find and update existing enrolled workout document
  result = await EnrolledWorkout.findOneAndUpdate(
    { user: payload.user },
    { $push: { modules: { $each: payload.modules } } },
    { new: true },
  );

  // Create a new document if not found
  if (!result) {
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
  const result = await EnrolledWorkout.find(query).populate([
    {
      path: 'user',
    },
    {
      path: 'workout',
    },
  ]);
  return result;
};

export const EnrolledWorkoutService = {
  createEnrolledWorkout,
  getAllEnrolledWorkouts,
  getSingleEnrolledWorkout,
  getEnrolledWorkoutModulesByUser,
};
