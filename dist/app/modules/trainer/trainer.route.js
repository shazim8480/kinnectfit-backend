"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const trainer_controller_1 = require("./trainer.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const trainer_validation_1 = require("./trainer.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/trainer-request', (0, auth_1.default)(user_1.ENU_USER_ROLE.USER), (0, validateRequest_1.default)(trainer_validation_1.TrainerValidation.createZodTrainerSchema), trainer_controller_1.TrainerController.trainerRequest);
router.post('/create-trainer', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN), trainer_controller_1.TrainerController.createTrainer);
router.post('/pause-trainer', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN), trainer_controller_1.TrainerController.pauseTrainer);
router.get('/trainers', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN), trainer_controller_1.TrainerController.getAllTrainers);
router.get('/:id', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.TRAINER),
trainer_controller_1.TrainerController.getSingleTrainer);
exports.TrainerRoutes = router;
