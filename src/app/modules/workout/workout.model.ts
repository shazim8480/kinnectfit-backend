import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { IWorkout } from './workout.interface';

const workoutSchema = new Schema<IWorkout>(
  {
    workout_name: {
      type: String,
      required: true,
    },
    workout_category: {
      type: String,
      required: true,
    },
    total_workout_time: {
      type: String,
      required: true,
    },
    workout_description: {
      type: String,
      required: true,
    },
    workout_cover: {
      type: [String],
    },
    trainer: { type: Schema.Types.ObjectId, ref: 'Trainer', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// 3. Create a Workout  Model.
export const Workout = model<IWorkout>('Workout', workoutSchema);
