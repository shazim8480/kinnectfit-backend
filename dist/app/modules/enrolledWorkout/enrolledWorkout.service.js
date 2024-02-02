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
exports.EnrolledWorkoutService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const enrolledWorkout_model_1 = require("./enrolledWorkout.model");
const workout_model_1 = require("../workout/workout.model");
const createEnrolledWorkout = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user exist
    const isUserExist = yield user_model_1.User.findById(payload.user);
    const isWorkoutExist = yield workout_model_1.Workout.findById(payload.workout);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (!isWorkoutExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Workout does not exist');
    }
    const isEnrollUserExist = yield enrolledWorkout_model_1.EnrolledWorkout.findOne({
        user: payload.user,
    });
    const isEnrollWorkoutExist = yield enrolledWorkout_model_1.EnrolledWorkout.findOne({
        workout: payload.workout,
    });
    // if user exist but workout new
    let result;
    if (isEnrollUserExist && !isEnrollWorkoutExist) {
        result = (yield enrolledWorkout_model_1.EnrolledWorkout.create(payload)).populate([
            { path: 'user' },
            {
                path: 'workout',
            },
        ]);
    }
    // Find and update existing enrolled workout document
    result = yield enrolledWorkout_model_1.EnrolledWorkout.findOneAndUpdate({ user: payload.user }, { $push: { modules: { $each: payload.modules } } }, { new: true });
    // Create a new document if not found
    if (!result) {
        result = (yield enrolledWorkout_model_1.EnrolledWorkout.create(payload)).populate([
            { path: 'user' },
        ]);
    }
    return result;
});
const getAllEnrolledWorkouts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrolledWorkout_model_1.EnrolledWorkout.find({}).populate([
        {
            path: 'user',
        },
    ]);
    return result;
});
const getSingleEnrolledWorkout = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield enrolledWorkout_model_1.EnrolledWorkout.findById(id).populate([
        {
            path: 'user',
        },
    ]);
    return result;
});
const getEnrolledWorkoutModulesByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { user: id };
    const result = yield enrolledWorkout_model_1.EnrolledWorkout.find(query).populate([
        {
            path: 'user',
        },
        {
            path: 'workout',
        },
    ]);
    return result;
});
exports.EnrolledWorkoutService = {
    createEnrolledWorkout,
    getAllEnrolledWorkouts,
    getSingleEnrolledWorkout,
    getEnrolledWorkoutModulesByUser,
};
