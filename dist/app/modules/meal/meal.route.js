"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const meal_validation_1 = require("./meal.validation");
const meal_controller_1 = require("./meal.controller");
const router = express_1.default.Router();
router.post('/create-meal', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN, user_1.ENU_USER_ROLE.TRAINER), (0, validateRequest_1.default)(meal_validation_1.MealValidation.createZodMealSchema), meal_controller_1.MealController.createMeal);
router.get('/meals', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
meal_controller_1.MealController.getAllMeals);
router.get('/:id', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
meal_controller_1.MealController.getSingleMealPlan);
router.get('/trainer/:id', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
meal_controller_1.MealController.getMealsByTrainer);
exports.MealRoutes = router;
