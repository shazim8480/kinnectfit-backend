"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const mealPlan_route_1 = require("../app/modules/mealPlan/mealPlan.route");
const trainer_route_1 = require("../app/modules/trainer/trainer.route");
const user_route_1 = require("../app/modules/user/user.route");
const profileInfo_route_1 = require("../app/modules/profileInfo/profileInfo.route");
const meal_route_1 = require("../app/modules/meal/meal.route");
const selectedMeals_route_1 = require("../app/modules/selectedMeals/selectedMeals.route");
const review_route_1 = require("../app/modules/review/review.route");
const workout_route_1 = require("../app/modules/workout/workout.route");
const workoutModule_route_1 = require("../app/modules/workoutModules/workoutModule.route");
const enrolledWorkout_route_1 = require("../app/modules/enrolledWorkout/enrolledWorkout.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_route_1.userRoutes,
    },
    {
        path: '/meal-plan',
        route: mealPlan_route_1.MealPlanRoutes,
    },
    {
        path: '/meal',
        route: meal_route_1.MealRoutes,
    },
    {
        path: '/select-meal',
        route: selectedMeals_route_1.SelectedMealsRoutes,
    },
    {
        path: '/trainer',
        route: trainer_route_1.TrainerRoutes,
    },
    {
        path: '/profile-info',
        route: profileInfo_route_1.ProfileInfoRoutes,
    },
    {
        path: '/review',
        route: review_route_1.ReviewRoutes,
    },
    {
        path: '/workout',
        route: workout_route_1.WorkoutRoutes,
    },
    {
        path: '/workout-module',
        route: workoutModule_route_1.WorkoutModuleRoutes,
    },
    {
        path: '/enrolled-workout',
        route: enrolledWorkout_route_1.EnrolledWorkoutRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.routes = router;
