"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileInfoValidation = void 0;
const zod_1 = require("zod");
const profileInfo_constant_1 = require("./profileInfo.constant");
const createZodProfileInfoSchema = zod_1.z.object({
    body: zod_1.z.object({
        height: zod_1.z.number({
            required_error: 'Please enter your height',
        }),
        weight: zod_1.z.number({
            required_error: 'Please enter your weight',
        }),
        goal_weight: zod_1.z.number({
            required_error: 'Please enter your goal weight',
        }),
        age: zod_1.z.number({
            required_error: 'Please enter your age',
        }),
        country: zod_1.z.string({
            required_error: 'Please choose your country',
        }),
        gender: zod_1.z.enum([...profileInfo_constant_1.userGender], {
            required_error: 'Please choose your gender',
        }),
        set_goal: zod_1.z.enum([...profileInfo_constant_1.userGoal], {
            required_error: 'Please set your goal',
        }),
        set_plan: zod_1.z.enum([...profileInfo_constant_1.userPlan], {
            required_error: 'Please set your plan',
        }),
        user: zod_1.z.string({
            required_error: 'User is required',
        }),
    }),
});
exports.ProfileInfoValidation = {
    createZodProfileInfoSchema,
};
