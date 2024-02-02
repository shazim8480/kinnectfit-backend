"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/sign-up', (0, validateRequest_1.default)(user_validation_1.UserValidation.createZodUserSchema), user_controller_1.UserController.createUser);
router.post('/sign-in', user_controller_1.UserController.loginUser);
router.post('/refresh-token', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN, user_1.ENU_USER_ROLE.USER), user_controller_1.UserController.refreshToken);
router.get('/all-users', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN), user_controller_1.UserController.getAllUsers);
router.get('/:id', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN, user_1.ENU_USER_ROLE.USER), user_controller_1.UserController.getSingleUser);
router.get('/find-trainer/:id', 
// auth(ENU_USER_ROLE.ADMIN, ENU_USER_ROLE.USER),
user_controller_1.UserController.getTrainerByUser);
exports.userRoutes = router;
