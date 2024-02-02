"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const mongoose_1 = require("mongoose");
const moduleSchema = new mongoose_1.Schema({
    module_name: { type: String, required: true },
    module_time: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// 3. Create a Workout  Model.
exports.Module = (0, mongoose_1.model)('Module', moduleSchema);
