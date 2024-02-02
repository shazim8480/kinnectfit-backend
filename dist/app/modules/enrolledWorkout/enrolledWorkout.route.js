"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledWorkoutRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const enrolledWorkout_validation_1 = require("./enrolledWorkout.validation");
const enrolledWorkout_controller_1 = require("./enrolledWorkout.controller");
const router = express_1.default.Router();
router.post('/enroll', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN, user_1.ENU_USER_ROLE.USER), (0, validateRequest_1.default)(enrolledWorkout_validation_1.EnrolledWorkoutValidation.createZodEnrolledWorkoutSchema), enrolledWorkout_controller_1.EnrolledWorkoutController.createEnrolledWorkout);
router.get('/all-modules', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
enrolledWorkout_controller_1.EnrolledWorkoutController.getAllEnrolledWorkouts);
router.get('/:id', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
enrolledWorkout_controller_1.EnrolledWorkoutController.getSingleEnrolledWorkout);
router.get('/user/:id', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
enrolledWorkout_controller_1.EnrolledWorkoutController.getEnrolledWorkoutModulesByUser);
exports.EnrolledWorkoutRoutes = router;
