"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleTypes = void 0;
exports.moduleTypes = {
    module_name: { type: String, required: true },
    module_time: { type: String, required: true },
    isCompleted: { type: Boolean, required: true, default: false },
};
