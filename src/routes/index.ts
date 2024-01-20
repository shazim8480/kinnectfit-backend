import express from 'express';
import { MealPlanRoutes } from '../app/modules/mealPlan/mealPlan.route';
import { TrainerRoutes } from '../app/modules/trainer/trainer.route';
import { userRoutes } from '../app/modules/user/user.route';
import { ProfileInfoRoutes } from '../app/modules/profileInfo/profileInfo.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/meal-plan',
    route: MealPlanRoutes,
  },
  {
    path: '/trainer',
    route: TrainerRoutes,
  },
  {
    path: '/profile-info',
    route: ProfileInfoRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export const routes = router;
