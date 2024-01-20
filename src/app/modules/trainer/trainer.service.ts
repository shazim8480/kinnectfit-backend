/* eslint-disable no-self-assign */
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
  const result = (await Trainer.create(payload)).populate('user');
  return result;
};

export const TrainerService = {
  createTrainer,
};
