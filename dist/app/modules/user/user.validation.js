"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createZodUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Please enter your name',
        }),
        password: zod_1.z.string({
            required_error: 'Please enter your password',
        }),
        email: zod_1.z
            .string({ required_error: 'Please enter your email address' })
            .email(),
        role: zod_1.z.enum([...user_constant_1.userRoles]).optional(),
        img_url: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    createZodUserSchema,
};
