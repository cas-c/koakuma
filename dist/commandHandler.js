"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addRole_1 = __importDefault(require("./commands/addRole"));
const check_1 = __importDefault(require("./commands/check"));
const emote_1 = __importDefault(require("./commands/emote"));
const ping_1 = __importDefault(require("./commands/ping"));
const roleInfo_1 = __importDefault(require("./commands/roleInfo"));
const roles_1 = __importDefault(require("./commands/roles"));
const yoink_1 = __importDefault(require("./commands/yoink"));
const who_1 = __importDefault(require("./commands/who"));
const test_1 = __importDefault(require("./commands/test"));
const commandHandler = (message) => {
    const splitBySpaces = message.cleanContent.split(" ");
    const textCommand = splitBySpaces[0].split("!");
    const assumedMainCommand = textCommand[1].toLowerCase();
    const assumedFirstArgument = splitBySpaces[1];
    // mom?.send(`${assumedMainnCommand} from ${message.channel} in ${message.guild}`);
    // i love switch dont tell anyone theyll call me cringe and unfunctionalpilled
    switch (assumedMainCommand) {
        case "check":
            (0, check_1.default)(message);
            return;
        case "ping":
            (0, ping_1.default)(message);
            return;
        case "addrole":
            const roleString = splitBySpaces.slice(1).join(" ");
            (0, addRole_1.default)(message, roleString);
            return;
        case "roleinfo":
            (0, roleInfo_1.default)(message, assumedFirstArgument);
            return;
        case "roles":
            (0, roles_1.default)(message);
            return;
        case "emote":
            (0, emote_1.default)(message, assumedFirstArgument);
            return;
        case "yoink":
            (0, yoink_1.default)(message, assumedFirstArgument);
            return;
        case "who":
            (0, who_1.default)(message, assumedFirstArgument);
            return;
        case "test":
            (0, test_1.default)(message);
            return;
        default:
            return;
    }
};
exports.default = commandHandler;
//# sourceMappingURL=commandHandler.js.map