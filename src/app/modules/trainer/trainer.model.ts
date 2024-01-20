import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { ITrainer } from './trainer.interface';

const trainerSchema = new Schema<ITrainer>(
  {
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    age: { type: Number, required: true },
    bmi: { type: Number, required: true },
    images: { type: [String] },
  },
  {
    timestamps: true,
  },
);

// 3. Create a Meal Plan Model.
export const Trainer = model<ITrainer>('Trainer', trainerSchema);
