"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealValidation = void 0;
const zod_1 = require("zod");
const meal_constant_1 = require("./meal.constant");
const createZodMealSchema = zod_1.z.object({
    body: zod_1.z.object({
        meal_name: zod_1.z.string({
            required_error: 'Please give a meal name',
        }),
        meal_category: zod_1.z
            .enum([...meal_constant_1.MealCategories])
            .optional(),
        meal_cover: zod_1.z.string().array().optional(),
        protein: zod_1.z.string({
            required_error: 'Please enter protein quantity',
        }),
        carbs: zod_1.z.string({
            required_error: 'Please enter carbs quantity',
        }),
        fat: zod_1.z.string({
            required_error: 'Please enter fat quantity',
        }),
        prep_time: zod_1.z.string({
            required_error: 'Please enter preparation time',
        }),
        ingredients: zod_1.z
            .string({
            required_error: 'Please add ingredients items',
        })
            .array(),
        mealPlan: zod_1.z.string({
            required_error: 'Meal plan is required',
        }),
        trainer: zod_1.z.string({
            required_error: 'Trainer is required',
        }),
    }),
});
exports.MealValidation = {
    createZodMealSchema,
};
