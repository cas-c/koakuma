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
const config = require("../../config.json");
const onMessageReactionAdd = (messageReaction, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (messageReaction.message.channelId !== config.roleChannel || (user === null || user === void 0 ? void 0 : user.bot)) {
        return;
    }
    const roleJson = require(`${process.cwd()}/data/roles/${messageReaction.message.id}.json`);
    if (roleJson && (roleJson === null || roleJson === void 0 ? void 0 : roleJson.roleId) && user) {
        const targetUser = yield ((_a = messageReaction.message.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(user.id));
        yield (targetUser === null || targetUser === void 0 ? void 0 : targetUser.roles.add(roleJson.roleId));
    }
    return;
});
exports.default = onMessageReactionAdd;
//# sourceMappingURL=onMessageReactionAdd.js.map