import { defaultMealCover } from "./mealPlan.constant";
import { IMealPlan } from "./mealPlan.interface";
import { MealPlan } from "./mealPlan.model";

const createMealPlan = async (payload: IMealPlan) => {
  let { mealPlan_cover } = payload;
  // set meal cover when it's not given
  !mealPlan_cover
    ? (payload.mealPlan_cover = defaultMealCover)
    : (payload.mealPlan_cover = mealPlan_cover);
  const result = await MealPlan.create(payload);
  return result;
};
const getAllMealPlans = async () => {
  const result = await MealPlan.find({});
  return result;
};
export const MealPlanService = {
  createMealPlan,
  getAllMealPlans,
};
