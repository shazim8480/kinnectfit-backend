/* eslint-disable no-self-assign */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { trainerDefaultImg } from './trainer.constant';
import { ICreateTrainer, ITrainer } from './trainer.interface';
import { Trainer } from './trainer.model';

const trainerRequest = async (payload: ITrainer) => {
  const isExist = await Trainer.find({ user: payload.user });
  if (isExist.length !== 0) {
    throw new ApiError(httpStatus.CONFLICT, 'User is already a trainer.');
  }
  const defaultImg = [];
  defaultImg.push(trainerDefaultImg);

  // set default trainer img when it's missing
  !payload.images || payload.images?.length === 0
    ? (payload.images = defaultImg)
    : (payload.images = payload.images);

  try {
    const result = (await Trainer.create(payload)).populate('user');
    return result;
  } catch (error) {
    // console.log(error);
  }
};
const createTrainer = async (payload: ICreateTrainer) => {
  const trainerExist = await Trainer.findOne({ user: payload.user });
  if (!trainerExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Please make a trainer request at first',
    );
  } else if (trainerExist && trainerExist.status === 'approved') {
    throw new ApiError(httpStatus.NOT_FOUND, 'User is already a trainer');
  } else if (trainerExist && trainerExist.status === 'pending') {
    const session = await Trainer.startSession();
    session.startTransaction();

    try {
      // Update user role to "trainer"
      await User.findByIdAndUpdate(payload.user, { $set: { role: 'trainer' } });
      await Trainer.findOneAndUpdate(
        { user: payload.user },
        {
          $set: { status: 'approved' },
        },
      );

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
      // console.log('result', result);
      // return;
      const result = await Trainer.findOne({ user: payload.user }).populate(
        'user',
      );
      return result;
    } catch (error) {
      // If an error occurs, abort the transaction
      await session.abortTransaction();
      session.endSession();
      throw error; // Rethrow the error
    }
  }
};

const getAllTrainers = async () => {
  const result = await Trainer.find({}).populate('user');
  return result;
};

const getSingleTrainer = async (id: string) => {
  const result = await Trainer.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Trainer does not exist!');
  }
  return result;
};

export const TrainerService = {
  trainerRequest,
  createTrainer,
  getAllTrainers,
  getSingleTrainer,
};
