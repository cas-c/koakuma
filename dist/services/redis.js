"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default({ lazyConnect: true });
redis
    .on("connect", () => {
    console.log("Koakuma connected to redis.");
})
    .on("error", (err) => {
    console.error("Koakuma redis connection error", err);
})
    .on("reconnecting", () => {
    console.log("Koakuma reconnecting to redis!");
})
    .on("close", () => {
    console.warn("Koakuma redis connection was closed");
});
exports.default = redis;
//# sourceMappingURL=redis.js.map