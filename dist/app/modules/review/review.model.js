"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const review_constant_1 = require("./review.constant");
const reviewSchema = new mongoose_1.Schema({
    review_item_name: {
        type: String,
    },
    review_type: {
        type: String,
        enum: review_constant_1.reviewTypes,
        required: true,
    },
    review_description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review_cover: {
        type: [String],
    },
    workout: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Workout' },
    mealPlan: { type: mongoose_1.Schema.Types.ObjectId, ref: 'MealPlan' },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// 3. Create a Meal  Model.
exports.Review = (0, mongoose_2.model)('Review', reviewSchema);
