import { ITrainer } from './trainer.interface';
import { Trainer } from './trainer.model';

const createTrainer = async (trainerData: ITrainer) => {
  const result = await Trainer.create(trainerData);
  return result;
};

export const TrainerService = {
  createTrainer,
};
