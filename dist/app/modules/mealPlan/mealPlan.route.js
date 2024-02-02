"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlanRoutes = void 0;
const express_1 = __importDefault(require("express"));
const mealPlan_controller_1 = require("./mealPlan.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const mealPlan_validation_1 = require("./mealPlan.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-mealplan', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN, user_1.ENU_USER_ROLE.TRAINER), (0, validateRequest_1.default)(mealPlan_validation_1.MealPlanValidation.createZodMealPlanSchema), mealPlan_controller_1.MealPlanController.createMealPlan);
router.get('/mealplans', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER, ENU_USER_ROLE.USER),
mealPlan_controller_1.MealPlanController.getAllMealPlans);
router.get('/:id', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER, ENU_USER_ROLE.USER),
mealPlan_controller_1.MealPlanController.getSingleMealPlan);
router.get('/meals/:id', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER, ENU_USER_ROLE.USER),
mealPlan_controller_1.MealPlanController.getMealsByMealPlan);
router.get('/trainer/:id', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER, ENU_USER_ROLE.USER),
mealPlan_controller_1.MealPlanController.getMealPlansByTrainer);
exports.MealPlanRoutes = router;
