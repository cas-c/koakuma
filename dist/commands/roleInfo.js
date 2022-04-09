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
const roleInfo = (message, roleId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const users = (_b = (yield ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.roles.fetch(roleId)))) === null || _b === void 0 ? void 0 : _b.members.map((m) => `${m.displayName} (${m.user.username})`);
    if (!users) {
        return message.reply("couldn't grab user info for this role for some reason :c");
    }
    console.log(users);
    return message.reply(users.join(", "));
});
exports.default = roleInfo;
//# sourceMappingURL=roleInfo.js.map