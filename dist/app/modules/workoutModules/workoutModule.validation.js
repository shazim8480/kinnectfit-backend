"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModuleValidation = void 0;
const zod_1 = require("zod");
const createZodWorkoutModuleSchema = zod_1.z.object({
    body: zod_1.z.object({
        modules: zod_1.z
            .object({
            module_name: zod_1.z.string({
                required_error: 'Module name is required',
            }),
            module_time: zod_1.z.string({
                required_error: 'Module time is required',
            }),
            isCompleted: zod_1.z.boolean({}).optional(),
        })
            .array(),
        workout: zod_1.z.string({
            required_error: 'Workout is required',
        }),
        trainer: zod_1.z.string({
            required_error: 'Trainer is required',
        }),
    }),
});
exports.WorkoutModuleValidation = {
    createZodWorkoutModuleSchema,
};
