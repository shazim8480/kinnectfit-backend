import { Schema } from 'mongoose';

export const enrolledWorkoutTypes = {
  module: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
  module_name: { type: String, required: true },
  module_time: { type: String, required: true },
  isCompleted: { type: Boolean, required: true, default: false },
};
