"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedMealsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const selectedMeals_validation_1 = require("./selectedMeals.validation");
const selectedMeals_controller_1 = require("./selectedMeals.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/select', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN, user_1.ENU_USER_ROLE.USER), (0, validateRequest_1.default)(selectedMeals_validation_1.SelectedMealsValidation.createZodSelectedMealsSchema), selectedMeals_controller_1.SelectedMealsController.createSelectedMeals);
router.get('/meals', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN, user_1.ENU_USER_ROLE.USER), selectedMeals_controller_1.SelectedMealsController.getAllSelectedMeals);
router.get('/meal/:id', selectedMeals_controller_1.SelectedMealsController.getSingleSelectedMeal);
router.get('/user-meals/:id', selectedMeals_controller_1.SelectedMealsController.getSelectedMealsByUserId);
exports.SelectedMealsRoutes = router;
