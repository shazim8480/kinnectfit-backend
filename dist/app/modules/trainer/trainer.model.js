"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trainer = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const trainer_constant_1 = require("./trainer.constant");
const trainerSchema = new mongoose_1.Schema({
    height: { type: String, required: true },
    weight: { type: String, required: true },
    age: { type: String, required: true },
    bmi: { type: String, required: true },
    images: { type: [String] },
    status: {
        type: String,
        required: true,
        enum: trainer_constant_1.trainerStatus,
        default: 'pending',
    },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// 3. Create a Meal Plan Model.
exports.Trainer = (0, mongoose_2.model)('Trainer', trainerSchema);
