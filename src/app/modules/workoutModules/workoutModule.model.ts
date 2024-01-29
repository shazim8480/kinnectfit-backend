import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { IWorkoutModule } from './workoutModule.interface';
import { moduleTypes } from './workoutModule.constant';

const workoutModuleSchema = new Schema<IWorkoutModule>(
  {
    modules: [moduleTypes],
    workout: { type: Schema.Types.ObjectId, ref: 'Workout', required: true },
    trainer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// 3. Create a Workout  Model.
export const WorkoutModule = model<IWorkoutModule>(
  'WorkoutModule',
  workoutModuleSchema,
);
