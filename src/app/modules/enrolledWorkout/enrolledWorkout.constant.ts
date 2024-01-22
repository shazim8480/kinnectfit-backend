import { Schema } from 'mongoose';

export const enrolledWorkoutTypes = {
  module_id: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
  isCompleted: { type: Boolean, default: true },
};
