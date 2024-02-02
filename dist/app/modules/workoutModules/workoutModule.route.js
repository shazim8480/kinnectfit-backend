"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModuleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const workoutModule_validation_1 = require("./workoutModule.validation");
const workoutModule_controller_1 = require("./workoutModule.controller");
const router = express_1.default.Router();
router.post('/create', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN, user_1.ENU_USER_ROLE.TRAINER), (0, validateRequest_1.default)(workoutModule_validation_1.WorkoutModuleValidation.createZodWorkoutModuleSchema), workoutModule_controller_1.WorkoutModuleController.createWorkoutModule);
router.get('/all-modules', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
workoutModule_controller_1.WorkoutModuleController.getAllWorkoutModules);
router.get('/:id', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
workoutModule_controller_1.WorkoutModuleController.getSingleWorkoutModule);
router.get('/workout/:id', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
workoutModule_controller_1.WorkoutModuleController.getWorkoutModulesByWorkout);
router.get('/trainer/:id', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
workoutModule_controller_1.WorkoutModuleController.getWorkoutModulesByTrainer);
exports.WorkoutModuleRoutes = router;
