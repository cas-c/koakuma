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
const cheerio_1 = require("cheerio");
const discord_js_1 = require("discord.js");
const node_fetch_1 = __importDefault(require("node-fetch"));
const config = require('../../config.json');
const getWebcamImage = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let previousWebcamImage;
    const fetchResponse = yield (0, node_fetch_1.default)(config.cameraSource);
    const galleryPage = yield fetchResponse.text();
    const $ = (0, cheerio_1.load)(galleryPage);
    const mostRecentImage = (_b = (_a = $("a", ".gallery-wrapper").first()[0]) === null || _a === void 0 ? void 0 : _a.attribs) === null || _b === void 0 ? void 0 : _b.href;
    const hasNewImage = mostRecentImage && mostRecentImage !== previousWebcamImage;
    if (mostRecentImage && mostRecentImage !== previousWebcamImage) {
        previousWebcamImage = `${config.imageSource}${mostRecentImage}`;
    }
    const attachment = previousWebcamImage && new discord_js_1.AttachmentBuilder(previousWebcamImage, { name: 'image' });
    return {
        attachment,
        mostRecentImage,
        hasNewImage,
        previousWebcamImage,
    };
});
exports.default = getWebcamImage;
//# sourceMappingURL=getWebcamImage.js.map