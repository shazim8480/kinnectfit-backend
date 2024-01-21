import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { IReview } from './review.interface';
import { reviewTypes } from './review.constant';

const reviewSchema = new Schema<IReview>(
  {
    reviewItem_name: {
      type: String,
      required: true,
    },
    review_type: {
      type: String,
      enum: reviewTypes,
      required: true,
    },
    review_description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review_cover: {
      type: [String],
    },
    // workout: { type: Schema.Types.ObjectId, ref: 'Workout' },   `//! When workout module will be created connect it
    mealPlan: { type: Schema.Types.ObjectId, ref: 'MealPlan' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// 3. Create a Meal  Model.
export const Review = model<IReview>('Review', reviewSchema);
