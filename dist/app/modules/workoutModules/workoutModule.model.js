"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutModule = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const workoutModule_constant_1 = require("./workoutModule.constant");
const workoutModuleSchema = new mongoose_1.Schema({
    modules: [workoutModule_constant_1.moduleTypes],
    workout: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Workout', required: true },
    trainer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// 3. Create a Workout  Model.
exports.WorkoutModule = (0, mongoose_2.model)('WorkoutModule', workoutModuleSchema);
