"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlanValidation = void 0;
const zod_1 = require("zod");
const createZodMealPlanSchema = zod_1.z.object({
    body: zod_1.z.object({
        mealPlan_name: zod_1.z.string({
            required_error: 'Please give a plan name',
        }),
        mealPlan_description: zod_1.z.string({
            required_error: 'Please give plan description',
        }),
        mealPlan_category: zod_1.z.string({
            required_error: 'Please give plan category name',
        }),
        mealPlan_cover: zod_1.z.string().array().optional(),
        trainer: zod_1.z.string({
            required_error: 'Trainer is required',
        }),
    }),
});
exports.MealPlanValidation = {
    createZodMealPlanSchema,
};
