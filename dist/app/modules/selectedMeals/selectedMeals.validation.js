"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedMealsValidation = void 0;
const zod_1 = require("zod");
const createZodSelectedMealsSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string({
            required_error: 'User is required',
        }),
        selected_meals: zod_1.z
            .string({
            required_error: 'Meals selection is required',
        })
            .array(),
    }),
});
exports.SelectedMealsValidation = {
    createZodSelectedMealsSchema,
};
