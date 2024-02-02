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
exports.WorkoutModuleService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const trainer_model_1 = require("../trainer/trainer.model");
const workoutModule_model_1 = require("./workoutModule.model");
const workout_model_1 = require("../workout/workout.model");
const createWorkoutModule = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the trainer is a valid trainer
    const isTrainerExist = yield trainer_model_1.Trainer.findOne({
        user: payload.trainer,
        status: 'approved',
    });
    if (!isTrainerExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Trainer does not exist');
    }
    // Check if the workout is a valid workout
    const isWorkoutValid = yield workout_model_1.Workout.findById(payload.workout);
    if (!isWorkoutValid) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Workout is not valid');
    }
    // Workout query based on trainer
    const trainerWorkout = {
        workout: payload.workout,
        trainer: payload.trainer,
    };
    // Check if the workout is exist on workout module
    const isWorkoutExist = yield workoutModule_model_1.WorkoutModule.findOne({
        workout: payload.workout,
    });
    if (!isWorkoutExist) {
        // If the workout doesn't exist, create a new workout module
        const result = (yield workoutModule_model_1.WorkoutModule.create(payload)).populate([
            {
                path: 'workout',
            },
            {
                path: 'trainer',
            },
        ]);
        return result;
    }
    else {
        // If the workout already exists, add new modules to the existing array
        const trainerOfWorkout = yield workoutModule_model_1.WorkoutModule.findOne(trainerWorkout);
        if (!trainerOfWorkout) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'This trainer did not created that workout');
        }
        yield workoutModule_model_1.WorkoutModule.updateOne(trainerWorkout, {
            $push: { modules: { $each: payload.modules } },
        });
        // Retrieve the updated workout module
        const result = yield workoutModule_model_1.WorkoutModule.findOne(trainerWorkout).populate([
            {
                path: 'workout',
            },
            {
                path: 'trainer',
                populate: [
                    {
                        path: 'user',
                    },
                ],
            },
        ]);
        return result;
    }
});
const getAllWorkoutModules = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield workoutModule_model_1.WorkoutModule.find({}).populate([
        {
            path: 'workout',
        },
        {
            path: 'trainer',
            // populate: [
            //   {
            //     path: 'user',
            //   },
            // ],
        },
    ]);
    return result;
});
const getSingleWorkoutModule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield workoutModule_model_1.WorkoutModule.findById(id).populate([
        {
            path: 'workout',
        },
        {
            path: 'trainer',
            populate: [
                {
                    path: 'user',
                },
            ],
        },
    ]);
    return result;
});
const getWorkoutModulesByWorkout = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { workout: id };
    const result = yield workoutModule_model_1.WorkoutModule.find(query);
    return result;
});
const getWorkoutModulesByTrainer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { trainer: id };
    const result = yield workoutModule_model_1.WorkoutModule.find(query).populate([
        {
            path: 'workout',
        },
        {
            path: 'trainer',
        },
    ]);
    return result;
});
exports.WorkoutModuleService = {
    createWorkoutModule,
    getAllWorkoutModules,
    getSingleWorkoutModule,
    getWorkoutModulesByWorkout,
    getWorkoutModulesByTrainer,
};
