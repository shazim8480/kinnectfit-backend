import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IReview } from './review.interface';
import { Review } from './review.model';
import { defaultReviewCover } from './review.constant';

const createReview = async (payload: IReview) => {
  // set review cover when it's not given
  const defaultImg = [];
  defaultImg.push(defaultReviewCover);
  !payload.review_cover || payload.review_cover?.length === 0
    ? (payload.review_cover = defaultImg)
    : // eslint-disable-next-line no-self-assign
      (payload.review_cover = payload.review_cover);

  // console.log('usersss', payload.user);
  const isUserExist = await User.findById(payload.user);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // console.log('isUserExist', isUserExist);
  if (isUserExist?.role === 'trainer') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Trainer can not give a review');
  } else {
    const result = (await Review.create(payload)).populate([
      {
        path: 'workout',
      },
      {
        path: 'mealPlan',
      },
      {
        path: 'user',
      },
    ]);
    return result;
  }
};

const getAllReviews = async () => {
  const result = await Review.find({}).populate([
    {
      path: 'workout',
    },
    {
      path: 'mealPlan',
    },
    {
      path: 'user',
    },
  ]);
  return result;
};

const getSingleReview = async (id: string) => {
  const result = await Review.findById(id).populate([
    {
      path: 'workout',
    },
    {
      path: 'mealPlan',
    },
    {
      path: 'user',
    },
  ]);
  return result;
};

const getReviewsByMealPlan = async (id: string) => {
  const query = { mealPlan: id };
  const result = await Review.find(query).populate([
    {
      path: 'mealPlan',
    },
    {
      path: 'user',
    },
  ]);
  return result;
};
const getReviewsByWorkout = async (id: string) => {
  const query = { workout: id };
  const result = await Review.find(query).populate([
    {
      path: 'workout',
    },

    {
      path: 'user',
    },
  ]);
  return result;
};
const getReviewsByApp = async () => {
  const query = { review_type: 'App' };
  const result = await Review.find(query).populate([
    {
      path: 'user',
    },
  ]);
  return result;
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getSingleReview,
  getReviewsByMealPlan,
  getReviewsByWorkout,
  getReviewsByApp,
};
