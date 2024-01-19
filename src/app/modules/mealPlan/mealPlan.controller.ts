import { Request, Response } from "express";
import { MealPlanService } from "./mealPlan.service";
import { defaultMealCover } from "./mealPlan.constants";
const createMealPlan = async (req: Request, res: Response) => {
  try {
    const { ...mealPlanData } = req.body;
    const result = await (
      await MealPlanService.createMealPlan(mealPlanData)
    ).populate("trainer");
    res.status(200).json({
      message: "Meal Plan created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error),
      res.status(400).json({
        message: "Meal Plan creation failed!",
      });
  }
};

const getAllMealPlans = async (req: Request, res: Response) => {
  try {
    const result = await MealPlanService.getAllMealPlans();
    res.status(200).json({
      message: "Meal Plan created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: "Meal Plan creation failed!",
    });
  }
};

export const MealPlanController = {
  createMealPlan,
  getAllMealPlans,
};
