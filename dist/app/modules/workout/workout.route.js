"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const workout_validation_1 = require("./workout.validation");
const workout_controller_1 = require("./workout.controller");
const router = express_1.default.Router();
router.post('/create-workout', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN, user_1.ENU_USER_ROLE.TRAINER), (0, validateRequest_1.default)(workout_validation_1.WorkoutValidation.createZodWorkoutSchema), workout_controller_1.WorkoutController.createWorkout);
router.get('/workouts', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
workout_controller_1.WorkoutController.getAllWorkouts);
router.get('/:id', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
workout_controller_1.WorkoutController.getSingleWorkout);
exports.WorkoutRoutes = router;
