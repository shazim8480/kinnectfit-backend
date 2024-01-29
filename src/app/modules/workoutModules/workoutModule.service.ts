import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Trainer } from '../trainer/trainer.model';
import { IWorkoutModule } from './workoutModule.interface';
import { WorkoutModule } from './workoutModule.model';
import { Workout } from '../workout/workout.model';

const createWorkoutModule = async (payload: IWorkoutModule) => {
  // Check if the trainer is a valid trainer
  const isTrainerExist = await Trainer.findOne({
    user: payload.trainer,
    status: 'approved',
  });

  if (!isTrainerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Trainer does not exist');
  }

  // Check if the workout is a valid workout
  const isWorkoutValid = await Workout.findById(payload.workout);
  if (!isWorkoutValid) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workout is not valid');
  }

  // Workout query based on trainer

  const trainerWorkout = {
    workout: payload.workout,
    trainer: payload.trainer,
  };

  // Check if the workout is exist on workout module
  const isWorkoutExist = await WorkoutModule.findOne({
    workout: payload.workout,
  });

  if (!isWorkoutExist) {
    // If the workout doesn't exist, create a new workout module
    const result = (await WorkoutModule.create(payload)).populate([
      {
        path: 'workout',
      },
      {
        path: 'trainer',
      },
    ]);

    return result;
  } else {
    // If the workout already exists, add new modules to the existing array
    const trainerOfWorkout = await WorkoutModule.findOne(trainerWorkout);
    if (!trainerOfWorkout) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'This trainer did not created that workout',
      );
    }
    await WorkoutModule.updateOne(trainerWorkout, {
      $push: { modules: { $each: payload.modules } },
    });

    // Retrieve the updated workout module
    const result = await WorkoutModule.findOne(trainerWorkout).populate([
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
  }
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

const getWorkoutModulesByWorkout = async (id: string) => {
  const query = { workout: id };

  const result = await WorkoutModule.find(query);
  return result;
};

export const WorkoutModuleService = {
  createWorkoutModule,
  getAllWorkoutModules,
  getSingleWorkoutModule,
  getWorkoutModulesByWorkout,
};
