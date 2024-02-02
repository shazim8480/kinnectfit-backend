"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedMeals = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const selectedMealsSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    selected_meals: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Meal',
            required: true,
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// 3. Create a Meal  Model.
exports.SelectedMeals = (0, mongoose_2.model)('SelectedMeals', selectedMealsSchema);
