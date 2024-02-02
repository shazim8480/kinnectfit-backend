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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutService = void 0;
const workout_model_1 = require("./workout.model");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const workout_constant_1 = require("./workout.constant");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const trainer_model_1 = require("../trainer/trainer.model");
const createWorkout = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const defaultImg = [];
    defaultImg.push(workout_constant_1.defaultWorkoutImg);
    // set default workout img when it's missing
    !payload.workout_cover || ((_a = payload.workout_cover) === null || _a === void 0 ? void 0 : _a.length) === 0
        ? (payload.workout_cover = defaultImg)
        : // eslint-disable-next-line no-self-assign
            (payload.workout_cover = payload.workout_cover);
    const trainerExist = yield trainer_model_1.Trainer.findOne({
        user: payload.trainer,
        status: 'approved',
    });
    if (!trainerExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Trainer does not exist');
    }
    const result = (yield workout_model_1.Workout.create(payload)).populate('trainer');
    return result;
});
const getAllWorkouts = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: workout_constant_1.workoutFilterableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to fullfill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // If there is no condition , put {} to give all data
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield workout_model_1.Workout.find(whereConditions)
        .populate('trainer')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield workout_model_1.Workout.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleWorkout = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield workout_model_1.Workout.findById(id).populate('trainer');
    return result;
});
exports.WorkoutService = {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
};
