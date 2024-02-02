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
exports.SelectedMealsService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const selectedMeals_model_1 = require("./selectedMeals.model");
const meal_model_1 = require("../meal/meal.model");
const createSelectedMeals = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user is valid user
    const userExist = yield user_model_1.User.findById(payload.user);
    if (!userExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No user found');
    }
    // Filter out items that do not exist in the Meal collection
    const validMealIds = yield meal_model_1.Meal.find({
        _id: { $in: payload.selected_meals },
    }).distinct('_id');
    // Check if all selected meals exist in the Meal collection
    if (validMealIds.length !== payload.selected_meals.length) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'One or more selected meals do not exist');
    }
    // Check if any of the selected meals have already been selected by the user
    const existingSelectedMeals = yield selectedMeals_model_1.SelectedMeals.findOne({
        user: payload.user,
        selected_meals: { $in: validMealIds },
    });
    if (existingSelectedMeals) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User has already selected some of the meals');
    }
    // Combine new selected meals with olds
    const filteredSelectedMeals = {
        user: payload.user,
        selected_meals: validMealIds,
    };
    let existUserSelectedMeals = yield selectedMeals_model_1.SelectedMeals.findOne({
        user: payload.user,
    });
    if (existUserSelectedMeals) {
        existUserSelectedMeals.selected_meals = [
            ...existUserSelectedMeals.selected_meals,
            ...validMealIds,
        ];
        yield existUserSelectedMeals.save();
    }
    else {
        existUserSelectedMeals = yield selectedMeals_model_1.SelectedMeals.create(filteredSelectedMeals);
    }
    const result = yield existUserSelectedMeals.populate([
        {
            path: 'selected_meals',
        },
        {
            path: 'user',
        },
    ]);
    return result;
});
const getAllSelectedMeals = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield selectedMeals_model_1.SelectedMeals.find({}).populate([
        {
            path: 'selected_meals',
        },
        {
            path: 'user',
        },
    ]);
    return result;
});
const getSingleSelectedMeal = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield selectedMeals_model_1.SelectedMeals.findById(id).populate([
        {
            path: 'selected_meals',
        },
        {
            path: 'user',
        },
    ]);
    return result;
});
const getSelectedMealsByUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield selectedMeals_model_1.SelectedMeals.find({ user: id }).populate([
        {
            path: 'selected_meals',
        },
        {
            path: 'user',
        },
    ]);
    return result;
});
exports.SelectedMealsService = {
    createSelectedMeals,
    getAllSelectedMeals,
    getSingleSelectedMeal,
    getSelectedMealsByUserId,
};
