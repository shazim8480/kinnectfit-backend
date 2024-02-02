"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutValidation = void 0;
const zod_1 = require("zod");
const createZodWorkoutSchema = zod_1.z.object({
    body: zod_1.z.object({
        workout_name: zod_1.z.string({
            required_error: 'Please give a workout name',
        }),
        workout_category: zod_1.z.string({
            required_error: 'Please give  workout category',
        }),
        workout_description: zod_1.z.string({
            required_error: 'Please give  workout description',
        }),
        total_workout_time: zod_1.z.string({
            required_error: 'Please enter total workout time',
        }),
        workout_cover: zod_1.z.string().array().optional(),
        trainer: zod_1.z.string({
            required_error: 'Trainer is required',
        }),
    }),
});
exports.WorkoutValidation = {
    createZodWorkoutSchema,
};
