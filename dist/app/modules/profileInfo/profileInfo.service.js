"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileInfoService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const profileInfo_model_1 = require("./profileInfo.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createProfileInfo = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield profileInfo_model_1.ProfileInfo.find({ user: payload.user });
    // console.log('isExist', isExist);
    if (isExist.length !== 0) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User profile is already updated');
    }
    const result = (yield profileInfo_model_1.ProfileInfo.create(payload)).populate('user');
    return result;
});
const getAllProfileInfos = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield profileInfo_model_1.ProfileInfo.find({}).populate('user');
    return result;
});
const getSingleProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield profileInfo_model_1.ProfileInfo.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Trainer does not exist!');
    }
    return result;
});
exports.ProfileInfoService = {
    createProfileInfo,
    getAllProfileInfos,
    getSingleProfile,
};
