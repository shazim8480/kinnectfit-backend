"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrolledWorkoutTypes = void 0;
const mongoose_1 = require("mongoose");
exports.enrolledWorkoutTypes = {
    module_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Module', required: true },
    isCompleted: { type: Boolean, default: true },
};
