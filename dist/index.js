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
const commandHandler_1 = __importDefault(require("./commandHandler"));
const redis_1 = __importDefault(require("./services/redis"));
const onMessageReactionAdd_1 = __importDefault(require("./events/onMessageReactionAdd"));
const onMessageReactionRemove_1 = __importDefault(require("./events/onMessageReactionRemove"));
const onVoiceStateUpdate_1 = __importDefault(require("./events/onVoiceStateUpdate"));
const onInteractionCreate_1 = __importDefault(require("./events/onInteractionCreate"));
const config = require("../config.json");
const Koakuma = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.DIRECT_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        discord_js_1.Intents.FLAGS.GUILD_MEMBERS,
        discord_js_1.Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"],
});
let mom;
let homeChannel;
let roleChannel;
const SEPTAPUS = "127296623779774464";
Koakuma.once("ready", (client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("ready!");
    redis_1.default.connect();
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setActivity({
        type: 3 /* WATCHING */,
        name: `since ${new Date(Date.now()).toTimeString().split("(")[0]}`,
    });
    const getRoleMessagesIntoCache = () => { };
    // todo: I might just make these the same thing and switch which gets assigned as 'homeChannel' based on config.
    // for now this is fine since i kinda wanna work on it both in the server and in dms. not a big deal
    mom = yield Koakuma.users.fetch(config.momId);
    homeChannel = (yield Koakuma.channels.fetch(config.homeChannel));
    getRoleMessagesIntoCache();
    roleChannel = (yield Koakuma.channels.fetch(config.roleChannel));
    if (config.env && config.env !== "dev") {
        homeChannel.send(config.loginMessage);
    }
    else {
        mom.send(config.loginMessage);
    }
}))
    .on("error", console.error)
    .on("messageCreate", (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot && message.author.id === SEPTAPUS) {
        if (message.cleanContent.includes("https://i.imgur")) {
            message.reply({
                attachments: [
                    new discord_js_1.MessageAttachment(message.cleanContent.split(": ")[1]),
                ],
            }); //;
        }
    }
    if (message.author.bot)
        return; // ignore bots ;_;
    // prefix handling!
    if (message.cleanContent.length > 2 &&
        message.cleanContent.toLowerCase().startsWith(config.prefix)) {
        (0, commandHandler_1.default)(message);
    }
}))
    .on("messageReactionAdd", onMessageReactionAdd_1.default)
    .on("messageReactionRemove", onMessageReactionRemove_1.default)
    .on("voiceStateUpdate", onVoiceStateUpdate_1.default)
    .on("interactionCreate", onInteractionCreate_1.default);
Koakuma.login(config.token);
//# sourceMappingURL=index.js.map