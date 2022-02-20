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
const check_1 = __importDefault(require("./commands/check"));
const config = require("../config.json");
const Koakuma = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.DIRECT_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES
    ]
});
let mom;
let homeChannel;
Koakuma
    .once('ready', (client) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("ready!");
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setActivity({ type: 'WATCHING', name: `since ${new Date(Date.now()).toTimeString().split('(')[0]}` });
    // todo: I might just make these the same thing and switch which gets assigned as 'homeChannel' based on config.
    // for now this is fine since i kinda wanna work on it both in the server and in dms. not a big deal
    mom = yield Koakuma.users.fetch(config.momId);
    homeChannel = (yield Koakuma.channels.fetch(config.homeChannel));
    if (config.env && config.env !== "dev") {
        homeChannel.send(config.loginMessage);
    }
    else {
        mom.send(config.loginMessage);
    }
}))
    .on('error', console.error)
    .on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    // prefix handling!
    if (message.cleanContent.length > 2 && message.cleanContent.startsWith(config.prefix)) {
        const splitBySpaces = message.cleanContent.split(' ');
        const textCommand = splitBySpaces[0].split('!');
        const assumedMainCommand = textCommand[1];
        // mom?.send(`${assumedMainnCommand} from ${message.channel} in ${message.guild}`);
        // i love switch dont tell anyone theyll call me cringe and unfunctionalpilled
        switch (assumedMainCommand) {
            case 'check':
                (0, check_1.default)(message, splitBySpaces.length > 0 ? splitBySpaces[1] : undefined);
            default:
                return;
        }
    }
}));
Koakuma.login(config.token);
//# sourceMappingURL=index.js.map