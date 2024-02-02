"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrolledWorkout = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const enrolledWorkout_constant_1 = require("./enrolledWorkout.constant");
const enrolledWorkoutSchema = new mongoose_1.Schema({
    modules: [enrolledWorkout_constant_1.enrolledWorkoutTypes],
    total_modules: { type: Number, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    workout: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Workout', required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// 3. Create a Workout  Model.
exports.EnrolledWorkout = (0, mongoose_2.model)('EnrolledWorkout', enrolledWorkoutSchema);
