"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// we're gonna check a webcam.
const discord_js_1 = require("discord.js");
const getWebcamImage_1 = __importDefault(require("../utils/getWebcamImage"));
const config = require("../../config.json");
let previousWebcamImage = "";
let lastFetchedTimestamp = 0;
let previousAttachment;
const check = (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (lastFetchedTimestamp !== 0 &&
        lastFetchedTimestamp > Date.now() - 600000) {
        const earlyReturnAttachment = new discord_js_1.MessageAttachment(previousWebcamImage);
        message.reply({
            files: [earlyReturnAttachment],
            content: `last capture time: <t:${Math.floor(lastFetchedTimestamp / 1000)}:R>`,
        });
        return;
    }
    try {
        const { attachment, hasNewImage } = yield (0, getWebcamImage_1.default)();
        const previousTimestamp = lastFetchedTimestamp;
        previousAttachment = attachment || previousAttachment;
        lastFetchedTimestamp = Date.now();
        message.reply({
            files: attachment ? [attachment] : [],
            content: `${previousTimestamp === 0
                ? ""
                : `previous: <t:${Math.floor(previousTimestamp / 1000)}:R> `}${hasNewImage
                ? `current: <t:${Math.floor(lastFetchedTimestamp / 1000)}:R>`
                : "No images found!"}`,
        });
    }
    catch (e) {
        console.error(e);
    }
    return;
});
exports.default = check;
//# sourceMappingURL=check.js.map