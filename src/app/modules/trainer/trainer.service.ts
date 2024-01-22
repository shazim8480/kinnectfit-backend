/* eslint-disable no-self-assign */
import { User } from '../user/user.model';
import { trainerDefaultImg } from './trainer.constant';
import { ITrainer } from './trainer.interface';
import { Trainer } from './trainer.model';

const createTrainer = async (payload: ITrainer) => {
  const defaultImg = [];
  defaultImg.push(trainerDefaultImg);

  // set default trainer img when it's missing
  !payload.images || payload.images?.length === 0
    ? (payload.images = defaultImg)
    : (payload.images = payload.images);

  let result;

  // Use a Mongoose transaction for atomicity
  const session = await Trainer.startSession();
  session.startTransaction();

  try {
    // Create trainer
    result = await Trainer.create(payload);

    // Update user role to "trainer"
    await User.findByIdAndUpdate(payload.user, { $set: { role: 'trainer' } });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    // If an error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();
    throw error; // Rethrow the error
  }

  // Populate 'user' after the transaction is complete
  return result.populate('user');
};

export const TrainerService = {
  createTrainer,
};
