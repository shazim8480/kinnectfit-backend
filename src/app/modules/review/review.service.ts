import { mealDefaultImg } from '../meal/meal.constant';
import { IReview } from './review.interface';
import { Review } from './review.model';

const createReview = async (payload: IReview) => {
  // set review cover when it's not given
  const defaultImg = [];
  defaultImg.push(mealDefaultImg);
  // set default trainer img when it's missing
  !payload.review_cover || payload.review_cover?.length === 0
    ? (payload.review_cover = defaultImg)
    : // eslint-disable-next-line no-self-assign
      (payload.review_cover = payload.review_cover);
  const result = (await Review.create(payload)).populate([
    // {
    //   path: 'workout',   //! populate workout when it is created
    // },
    {
      path: 'mealPlan',
    },
    {
      path: 'user',
    },
  ]);
  return result;
};

const getAllReviews = async () => {
  const result = await Review.find({}).populate([
    // {
    //   path: 'workout',   //! populate workout when it is created
    // },
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
    // {
    //   path: 'workout',   //! populate workout when it is created
    // },
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
    // {
    //   path: 'workout',   //! populate workout when it is created
    // },
    {
      path: 'mealPlan',
    },
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
};
