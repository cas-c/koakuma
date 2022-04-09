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
const fs_1 = __importDefault(require("fs"));
const config = require("../../config.json");
const addRole = (message, roleName) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const created = yield ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.roles.create({
        name: roleName,
        mentionable: true,
    }));
    if (created) {
        const roleChannel = (yield ((_c = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.channels.cache.get(config.roleChannel)) === null || _c === void 0 ? void 0 : _c.fetch()));
        const roleMessage = yield (roleChannel === null || roleChannel === void 0 ? void 0 : roleChannel.send(`New mentionable role: <@&${created.id}>.  React to this message to get this role added to you automatically!`));
        const roleObjectPath = `${process.cwd()}/data/roles/${roleMessage.id}.json`;
        const exists = fs_1.default.existsSync(roleObjectPath);
        const roleObject = {
            messageId: roleMessage === null || roleMessage === void 0 ? void 0 : roleMessage.id,
            roleId: created === null || created === void 0 ? void 0 : created.id,
            name: created === null || created === void 0 ? void 0 : created.name,
        };
        if (!exists) {
            fs_1.default.writeFileSync(roleObjectPath, JSON.stringify(roleObject, null, 2));
        }
        const targetUser = yield ((_d = message.guild) === null || _d === void 0 ? void 0 : _d.members.fetch(message.author.id));
        yield (targetUser === null || targetUser === void 0 ? void 0 : targetUser.roles.add(created.id));
        message.reply("done~");
    }
});
exports.default = addRole;
//# sourceMappingURL=addRole.js.map