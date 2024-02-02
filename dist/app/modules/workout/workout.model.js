"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    workout_name: {
        type: String,
        required: true,
    },
    workout_category: {
        type: String,
        required: true,
    },
    total_workout_time: {
        type: String,
        required: true,
    },
    workout_description: {
        type: String,
        required: true,
    },
    workout_cover: {
        type: [String],
    },
    trainer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// 3. Create a Workout  Model.
exports.Workout = (0, mongoose_2.model)('Workout', workoutSchema);
