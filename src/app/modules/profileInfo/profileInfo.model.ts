import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { IProfileInfo } from './profileInfo.interface';
import { userGender, userGoal, userPlan } from './profileInfo.constant';

const profileInfoSchema = new Schema<IProfileInfo>(
  {
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    goal_weight: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: userGender, required: true },
    country: { type: String, required: true },
    set_goal: { type: String, enum: userGoal, required: true },
    set_plan: { type: String, enum: userPlan, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// 3. Create a Profile Info Model.
export const ProfileInfo = model<IProfileInfo>(
  'ProfileInfo',
  profileInfoSchema,
);
