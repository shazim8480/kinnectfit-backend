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
exports.MealPlanService = void 0;
const trainer_model_1 = require("./../trainer/trainer.model");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const mealPlan_constant_1 = require("./mealPlan.constant");
const mealPlan_model_1 = require("./mealPlan.model");
const meal_model_1 = require("../meal/meal.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createMealPlan = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // set meal plan cover when it's not given
    const defaultImg = [];
    defaultImg.push(mealPlan_constant_1.defaultMealPlanCover);
    !payload.mealPlan_cover || ((_a = payload.mealPlan_cover) === null || _a === void 0 ? void 0 : _a.length) === 0
        ? (payload.mealPlan_cover = defaultImg)
        : // eslint-disable-next-line no-self-assign
            (payload.mealPlan_cover = payload.mealPlan_cover);
    const trainerExist = yield trainer_model_1.Trainer.findById(payload.trainer);
    if (!trainerExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Trainer does not exist');
    }
    else if (trainerExist &&
        (trainerExist.status === 'pending' || trainerExist.status === 'paused')) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Trainer must need to be approved to create meal plan.');
    }
    else if (trainerExist && trainerExist.status === 'approved') {
        const result = (yield mealPlan_model_1.MealPlan.create(payload)).populate('trainer');
        return result;
    }
});
const getAllMealPlans = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: mealPlan_constant_1.mealPlanFilterableFields.map(field => ({
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
    const result = yield mealPlan_model_1.MealPlan.find(whereConditions)
        .populate('trainer')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield mealPlan_model_1.MealPlan.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleMealPlan = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mealPlan_model_1.MealPlan.findById(id).populate({
        path: 'trainer',
        populate: {
            path: 'user',
        },
    });
    return result;
});
const getMealPlansByTrainer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const trainer = yield trainer_model_1.Trainer.findById(id);
    if (!trainer) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Trainer not found');
    }
    const result = yield mealPlan_model_1.MealPlan.find({ trainer: id }).populate([
        {
            path: 'trainer',
            populate: [
                {
                    path: 'user',
                },
            ],
        },
        // {
        //   path: 'mealPlan',
        // },
    ]);
    return result;
});
const getMealsByMealPlan = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meals = yield meal_model_1.Meal.find({ mealPlan: id }).lean().exec();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const organizedMeals = {};
        meals.forEach(meal => {
            const category = meal.meal_category;
            // If the category doesn't exist in the organizedMeals object, create an array for it
            if (!organizedMeals[category]) {
                organizedMeals[category] = [];
            }
            // Push the current meal to the corresponding category array
            organizedMeals[category].push(meal);
        });
        return organizedMeals;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.MealPlanService = {
    createMealPlan,
    getAllMealPlans,
    getSingleMealPlan,
    getMealsByMealPlan,
    getMealPlansByTrainer,
};
