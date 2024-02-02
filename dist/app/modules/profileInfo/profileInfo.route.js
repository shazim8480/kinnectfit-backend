"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileInfoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const profileInfo_controller_1 = require("./profileInfo.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const profileInfo_validation_1 = require("./profileInfo.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-profileinfo', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN, user_1.ENU_USER_ROLE.USER), (0, validateRequest_1.default)(profileInfo_validation_1.ProfileInfoValidation.createZodProfileInfoSchema), profileInfo_controller_1.ProfileInfoController.createProfileInfo);
router.get('/all-profiles', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN), profileInfo_controller_1.ProfileInfoController.getAllProfileInfos);
router.get('/:id', (0, auth_1.default)(user_1.ENU_USER_ROLE.ADMIN, user_1.ENU_USER_ROLE.USER), profileInfo_controller_1.ProfileInfoController.getSingleProfile);
exports.ProfileInfoRoutes = router;
