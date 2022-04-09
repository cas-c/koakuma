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
Object.defineProperty(exports, "__esModule", { value: true });
const yoink = (message, firstArgument) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let emoteCodes = message.content.match(/[a]{0,1}:([a-zA-Z]*):([0-9]*)/);
    let emoteName = emoteCodes && emoteCodes[1];
    let emoteCode = emoteCodes && emoteCodes[2];
    if (!emoteName || !emoteCode) {
        return message.reply("something went wrong, sorry?");
    }
    let response;
    if (message.content.includes("<a:") || firstArgument.includes("a:")) {
        response = yield ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.emojis.create(`https://cdn.discordapp.com/emojis/${emoteCode}.gif`, emoteName));
    }
    else {
        response = yield ((_b = message.guild) === null || _b === void 0 ? void 0 : _b.emojis.create(`https://cdn.discordapp.com/emojis/${emoteCode}.webp`, emoteName));
    }
    if (response === null || response === void 0 ? void 0 : response.name) {
        return yield (yield message.reply("done~")).react(response);
    }
    else {
        return message.reply("something went wrong, sorry~");
    }
});
exports.default = yoink;
//# sourceMappingURL=yoink.js.map