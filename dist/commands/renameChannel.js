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
const discord_js_1 = require("discord.js");
const renameChannel = (message, newChannelName) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.channel.type !== discord_js_1.ChannelType.GuildText) {
        message.reply("sorry, this command isn't supported here!");
        return;
    }
    if (!newChannelName) {
        message.reply("sorry, i need something to rename it to!");
        return;
    }
    try {
        const originalChannelName = message.channel.name;
        const channel = yield message.channel.setName(newChannelName);
        message.reply("done~ updated channel name from " + originalChannelName + " to " + channel.name);
        return;
    }
    catch (e) {
        console.log("error in rename channel", e);
        message.reply("sorry, something happened, not sure what :s ask cassie");
    }
    console.log("could not rename channel", message.channelId);
});
exports.default = renameChannel;
//# sourceMappingURL=renameChannel.js.map