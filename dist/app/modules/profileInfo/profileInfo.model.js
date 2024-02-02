"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileInfo = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const profileInfo_constant_1 = require("./profileInfo.constant");
const profileInfoSchema = new mongoose_1.Schema({
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    goal_weight: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: profileInfo_constant_1.userGender, required: true },
    country: { type: String, required: true },
    set_goal: { type: String, enum: profileInfo_constant_1.userGoal, required: true },
    set_plan: { type: String, enum: profileInfo_constant_1.userPlan, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// 3. Create a Profile Info Model.
exports.ProfileInfo = (0, mongoose_2.model)('ProfileInfo', profileInfoSchema);
