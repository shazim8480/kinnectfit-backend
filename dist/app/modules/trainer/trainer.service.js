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
exports.TrainerService = void 0;
/* eslint-disable no-self-assign */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const trainer_constant_1 = require("./trainer.constant");
const trainer_model_1 = require("./trainer.model");
const trainerRequest = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isExist = yield trainer_model_1.Trainer.findOne({ user: payload.user });
    if (isExist && isExist.status === 'approved') {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'User is already a trainer.');
    }
    else if (isExist && isExist.status === 'pending') {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Trainer request on pending.');
    }
    const defaultImg = [];
    defaultImg.push(trainer_constant_1.trainerDefaultImg);
    // set default trainer img when it's missing
    !payload.images || ((_a = payload.images) === null || _a === void 0 ? void 0 : _a.length) === 0
        ? (payload.images = defaultImg)
        : (payload.images = payload.images);
    try {
        const result = (yield trainer_model_1.Trainer.create(payload)).populate('user');
        return result;
    }
    catch (error) {
        // console.log(error);
    }
});
const createTrainer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const trainerExist = yield trainer_model_1.Trainer.findOne({ user: payload.user });
    if (!trainerExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Please make a trainer request at first');
    }
    else if (trainerExist && trainerExist.status === 'approved') {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User is already a trainer');
    }
    else if (trainerExist && trainerExist.status === 'pending') {
        const session = yield trainer_model_1.Trainer.startSession();
        session.startTransaction();
        try {
            // Update user role to "trainer"
            yield user_model_1.User.findByIdAndUpdate(payload.user, { $set: { role: 'trainer' } });
            yield trainer_model_1.Trainer.findOneAndUpdate({ user: payload.user }, {
                $set: { status: 'approved' },
            });
            // Commit the transaction
            yield session.commitTransaction();
            session.endSession();
            // console.log('result', result);
            // return;
            const result = yield trainer_model_1.Trainer.findOne({ user: payload.user }).populate('user');
            return result;
        }
        catch (error) {
            // If an error occurs, abort the transaction
            yield session.abortTransaction();
            session.endSession();
            throw error; // Rethrow the error
        }
    }
});
const pauseTrainer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const trainerExist = yield trainer_model_1.Trainer.findOne({ user: payload.user });
    if (!trainerExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Please make a trainer request at first');
    }
    else if (trainerExist && trainerExist.status === 'approved') {
        const session = yield trainer_model_1.Trainer.startSession();
        session.startTransaction();
        try {
            // Update user role to "user"
            yield user_model_1.User.findByIdAndUpdate(payload.user, { $set: { role: 'user' } });
            yield trainer_model_1.Trainer.findOneAndUpdate({ user: payload.user }, {
                $set: { status: 'paused' },
            });
            // Commit the transaction
            yield session.commitTransaction();
            session.endSession();
            // console.log('result', result);
            // return;
            const result = yield trainer_model_1.Trainer.findOne({ user: payload.user }).populate('user');
            return result;
        }
        catch (error) {
            // If an error occurs, abort the transaction
            yield session.abortTransaction();
            session.endSession();
            throw error; // Rethrow the error
        }
    }
});
const getAllTrainers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trainer_model_1.Trainer.find({}).populate('user');
    return result;
});
const getSingleTrainer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trainer_model_1.Trainer.findOne({ user: id }).populate('user');
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Trainer does not exist!');
    }
    return result;
});
exports.TrainerService = {
    trainerRequest,
    createTrainer,
    getAllTrainers,
    getSingleTrainer,
    pauseTrainer,
};
