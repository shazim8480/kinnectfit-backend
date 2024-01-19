// import express from "express";
// const router = express.Router();

// export const routes = router;

import express from "express";
import { MealPlanRoutes } from "../app/modules/mealPlan/mealPlan.route";
import { TrainerRoutes } from "../app/modules/trainer/trainer.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/meal-plan",
    route: MealPlanRoutes,
  },
  {
    path: "/trainer",
    route: TrainerRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export const routes = router;
