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
const discord_js_1 = require("discord.js");
const node_fetch_1 = __importDefault(require("node-fetch"));
const sharp_1 = __importDefault(require("sharp"));
const pointAt = (targetImage, targetChannel) => __awaiter(void 0, void 0, void 0, function* () {
    const pointImage = yield (yield (0, node_fetch_1.default)("https://cdn.discordapp.com/attachments/590652659418005544/982848340960116816/point.png")).buffer();
    (0, sharp_1.default)({
        create: {
            width: 1050,
            height: 850,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
    })
        .composite([
        { input: targetImage, gravity: "northwest" },
        {
            input: pointImage,
            gravity: "southeast",
        },
    ])
        .png()
        .toBuffer()
        .then((value) => {
        const attachment = new discord_js_1.MessageAttachment(value, "intruder.png");
        targetChannel.send({ files: [attachment] });
    });
});
exports.default = pointAt;
//# sourceMappingURL=pointAt.js.map