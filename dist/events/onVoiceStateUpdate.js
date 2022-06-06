"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("../services/redis"));
const onVoiceStateUpdate = (oldState, newState) => {
    if (newState.channelId) {
        if (oldState.channelId === null && oldState.id === newState.id) {
            redis_1.default.set(`joined:${newState.channelId}`, newState.id);
        }
    }
    else {
        redis_1.default.set(`left:${oldState.channelId}`, newState.id);
    }
};
exports.default = onVoiceStateUpdate;
//# sourceMappingURL=onVoiceStateUpdate.js.map