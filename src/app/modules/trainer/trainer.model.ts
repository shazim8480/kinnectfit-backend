import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { ITrainer } from './trainer.interface';

const trainerSchema = new Schema<ITrainer>(
  {
    height: { type: String, required: true },
    weight: { type: String, required: true },
    age: { type: String, required: true },
    bmi: { type: String, required: true },
    images: { type: [String] },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// 3. Create a Meal Plan Model.
export const Trainer = model<ITrainer>('Trainer', trainerSchema);
