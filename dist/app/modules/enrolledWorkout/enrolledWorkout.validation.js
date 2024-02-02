"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledWorkoutValidation = void 0;
const zod_1 = require("zod");
const createZodEnrolledWorkoutSchema = zod_1.z.object({
    body: zod_1.z.object({
        modules: zod_1.z
            .object({
            module_id: zod_1.z.string({
                required_error: 'Module id is required',
            }),
            isCompleted: zod_1.z.boolean({}).optional(),
        })
            .array(),
        total_modules: zod_1.z.number({
            required_error: 'Total modules is required',
        }),
        user: zod_1.z.string({
            required_error: 'User is required',
        }),
        workout: zod_1.z.string({
            required_error: 'Workout is required',
        }),
    }),
});
exports.EnrolledWorkoutValidation = {
    createZodEnrolledWorkoutSchema,
};
