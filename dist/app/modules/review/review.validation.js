"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const review_constant_1 = require("./review.constant");
const createZodReviewSchema = zod_1.z.object({
    body: zod_1.z.object({
        review_item_name: zod_1.z.string().optional(),
        review_type: zod_1.z.enum([...review_constant_1.reviewTypes], {
            required_error: 'Please choose a review type',
        }),
        review_cover: zod_1.z.string().array().optional(),
        rating: zod_1.z.number({
            required_error: 'Please give a rating',
        }),
        mealPlan: zod_1.z.string({}).optional(),
        workout: zod_1.z.string({}).optional(),
        user: zod_1.z.string({
            required_error: 'User is required',
        }),
    }),
});
exports.ReviewValidation = {
    createZodReviewSchema,
};
