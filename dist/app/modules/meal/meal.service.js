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
exports.MealService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const meal_constant_1 = require("./meal.constant");
const meal_model_1 = require("./meal.model");
const mealPlan_model_1 = require("../mealPlan/mealPlan.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const trainer_model_1 = require("../trainer/trainer.model");
const createMeal = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // set meal cover when it's not given
    const defaultImg = [];
    defaultImg.push(meal_constant_1.mealDefaultImg);
    !payload.meal_cover || ((_a = payload.meal_cover) === null || _a === void 0 ? void 0 : _a.length) === 0
        ? (payload.meal_cover = defaultImg)
        : // eslint-disable-next-line no-self-assign
            (payload.meal_cover = payload.meal_cover);
    const isMealPlanExist = yield mealPlan_model_1.MealPlan.findById(payload.mealPlan);
    const isTrainerExist = yield trainer_model_1.Trainer.findById(payload.trainer);
    if (!isMealPlanExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Meal plan does not exist');
    }
    if (!isTrainerExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Trainer does not exist');
    }
    else if ((isTrainerExist && isTrainerExist.status === 'pending') ||
        (isTrainerExist && isTrainerExist.status === 'paused')) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Trainer must need to be approved to create meal.');
    }
    const result = (yield meal_model_1.Meal.create(payload)).populate([
        {
            path: 'mealPlan',
        },
        {
            path: 'trainer',
        },
    ]);
    return result;
});
const getAllMeals = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: meal_constant_1.mealFilterableFields.map(field => ({
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
    const result = yield meal_model_1.Meal.find(whereConditions)
        .populate('mealPlan')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield meal_model_1.Meal.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleMeal = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meal_model_1.Meal.findById(id).populate('mealPlan');
    return result;
});
const getMealsByTrainer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isTrainerExist = yield trainer_model_1.Trainer.findById(id);
    // console.log('🚀 isTrainerExist', isTrainerExist);
    if (!isTrainerExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Trainer not found');
    }
    const result = yield meal_model_1.Meal.find({ trainer: id }).populate([
        {
            path: 'mealPlan',
        },
        {
            path: 'trainer',
        },
    ]);
    return result;
});
exports.MealService = {
    createMeal,
    getAllMeals,
    getSingleMeal,
    getMealsByTrainer,
};
