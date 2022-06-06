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
const redis_1 = __importDefault(require("../services/redis"));
const who = (message, direction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.guild || !message.member)
        return;
    const currentMemberVoice = message.member.voice.channelId;
    let memberId;
    switch (direction) {
        case "left":
            // find who left from redis;
            memberId = yield redis_1.default.get(`left:${currentMemberVoice}`);
            break;
        case "joined":
        default:
            // find who last joined from redis;
            memberId = yield redis_1.default.get(`joined:${currentMemberVoice}`);
            break;
    }
    let target;
    if (!memberId) {
        target = message.author;
    }
    else {
        target = yield message.client.users.fetch(memberId);
    }
    const authorImage = yield (yield (0, node_fetch_1.default)(`${target.displayAvatarURL()}?size=100`)).buffer();
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
        { input: authorImage, gravity: "northwest" },
        {
            input: pointImage,
            gravity: "southeast",
        },
    ])
        .png()
        .toBuffer()
        .then((value) => {
        const attachment = new discord_js_1.MessageAttachment(value, "intruder.png");
        message.channel.send({ files: [attachment] });
    });
});
exports.default = who;
//# sourceMappingURL=who.js.map