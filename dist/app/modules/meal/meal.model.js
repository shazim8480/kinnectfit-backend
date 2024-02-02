"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meal = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const meal_constant_1 = require("./meal.constant");
const mealSchema = new mongoose_1.Schema({
    meal_name: {
        type: String,
        required: true,
    },
    meal_category: {
        type: String,
        enum: meal_constant_1.MealCategories,
        required: true,
    },
    meal_cover: {
        type: [String],
    },
    protein: {
        type: String,
        required: true,
    },
    carbs: {
        type: String,
        required: true,
    },
    fat: {
        type: String,
        required: true,
    },
    prep_time: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    mealPlan: { type: mongoose_1.Schema.Types.ObjectId, ref: 'MealPlan', required: true },
    trainer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Trainer', required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// 3. Create a Meal  Model.
exports.Meal = (0, mongoose_2.model)('Meal', mealSchema);
