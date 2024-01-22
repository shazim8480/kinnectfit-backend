import { Schema, Types, model } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IModule } from '../workoutModules/workoutModule.interface';

export type IEnrolledWorkout = {
  modules: IEnrolledModule[];
  user: Types.ObjectId | IUser;
};
export type IEnrolledModule = {
  module_id: Types.ObjectId | IModule;
  isCompleted?: boolean;
};

const moduleSchema = new Schema<IModule>(
  {
    module_name: { type: String, required: true },
    module_time: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// 3. Create a Workout  Model.
export const Module = model<IModule>('Module', moduleSchema);
