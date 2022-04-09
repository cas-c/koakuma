"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emote = (message) => {
    const emoteCodes = message.content.match(/<[a-zA-Z:]*([0-9]*)>/);
    const emoteCode = (emoteCodes && emoteCodes[1]) || "";
    if (message.content.includes("<a:")) {
        return message.reply(`https://cdn.discordapp.com/emojis/${emoteCode}.gif`);
    }
    else {
        return message.reply(`https://cdn.discordapp.com/emojis/${emoteCode}.webp`);
    }
};
exports.default = emote;
//# sourceMappingURL=emote.js.map