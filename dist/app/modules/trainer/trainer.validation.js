"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerValidation = void 0;
const zod_1 = require("zod");
const trainer_constant_1 = require("./trainer.constant");
const createZodTrainerSchema = zod_1.z.object({
    body: zod_1.z.object({
        height: zod_1.z.string({
            required_error: 'Please enter your height',
        }),
        weight: zod_1.z.string({
            required_error: 'Please enter your weight',
        }),
        age: zod_1.z.string({
            required_error: 'Please enter your age',
        }),
        bmi: zod_1.z.string({
            required_error: 'Please enter your BMI',
        }),
        images: zod_1.z.string().array().optional(),
        status: zod_1.z.enum([...trainer_constant_1.trainerStatus]).optional(),
    }),
});
exports.TrainerValidation = {
    createZodTrainerSchema,
};
