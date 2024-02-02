"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlan = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const mealPlanSchema = new mongoose_1.Schema({
    mealPlan_name: { type: String, required: true },
    mealPlan_description: { type: String, required: true },
    mealPlan_category: { type: String, required: true },
    mealPlan_cover: { type: [String] },
    trainer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Trainer', required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// 3. Create a Meal Plan Model.
exports.MealPlan = (0, mongoose_2.model)('MealPlan', mealPlanSchema);
