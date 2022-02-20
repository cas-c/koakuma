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
const node_fetch_1 = __importDefault(require("node-fetch"));
const cheerio_1 = require("cheerio");
const config = require("../../config.json");
let previousWebcamImage = "";
let lastFetchedTimestamp = 0;
const check = (message, cameraNumber) => __awaiter(void 0, void 0, void 0, function* () {
    if (lastFetchedTimestamp !== 0 &&
        lastFetchedTimestamp > Date.now() - 600000) {
        // Use the helpful Attachment class structure to process the file for you
        const earlyReturnAttachment = new discord_js_1.MessageAttachment(previousWebcamImage);
        message.reply({
            files: [earlyReturnAttachment],
            content: `last capture time: <t:${Math.floor(lastFetchedTimestamp / 1000)}:R>`,
        });
        return;
    }
    try {
        const fetchResponse = yield (0, node_fetch_1.default)(config.cameraSource);
        const galleryPage = yield fetchResponse.text();
        const $ = (0, cheerio_1.load)(galleryPage);
        const mostRecentImage = $("a", ".gallery-wrapper").first()[0].attribs.href;
        if (mostRecentImage && mostRecentImage !== previousWebcamImage) {
            previousWebcamImage = `${config.imageSource}${mostRecentImage}`;
        }
        else {
            previousWebcamImage = "error";
        }
        const previousTimestamp = lastFetchedTimestamp;
        lastFetchedTimestamp = Date.now();
        // Use the helpful Attachment class structure to process the file for you
        const attachment = new discord_js_1.MessageAttachment(previousWebcamImage);
        // interaction.reply({ files: [attachment] });
        message.reply({
            files: [attachment],
            content: `${previousTimestamp === 0
                ? ""
                : `previous: <t:${Math.floor(previousTimestamp / 1000)}:R> `}current: <t:${Math.floor(lastFetchedTimestamp / 1000)}:R>`,
        });
    }
    catch (e) {
        console.error(e);
    }
    return;
});
exports.default = check;
//# sourceMappingURL=check.js.map