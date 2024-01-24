import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { ITrainer } from './trainer.interface';
import { trainerStatus } from './trainer.constant';

const trainerSchema = new Schema<ITrainer>(
  {
    height: { type: String, required: true },
    weight: { type: String, required: true },
    age: { type: String, required: true },
    bmi: { type: String, required: true },
    images: { type: [String] },
    status: {
      type: String,
      required: true,
      enum: trainerStatus,
      default: 'pending',
    },
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
