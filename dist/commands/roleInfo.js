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
    var _a, _b, _c;
    const guild = yield ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.fetch());
    const members = yield ((_c = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.members) === null || _c === void 0 ? void 0 : _c.fetch());
    const role = yield (guild === null || guild === void 0 ? void 0 : guild.roles.fetch(roleId));
    const users = role === null || role === void 0 ? void 0 : role.members;
    const usersWithRole = users === null || users === void 0 ? void 0 : users.map((m) => `${m.displayName} (${m.user.username})`);
    if (!usersWithRole || usersWithRole.length === 0) {
        return message.reply("couldn't grab user info for this role for some reason :c");
    }
    return message.reply({
        embeds: [
            {
                title: `Members with ${role === null || role === void 0 ? void 0 : role.name}: ${usersWithRole.length}.`,
                description: ((users === null || users === void 0 ? void 0 : users.size) || 0) > 25
                    ? "List of first 25 members with this role."
                    : "Here's a list of all members with this role!",
                fields: users === null || users === void 0 ? void 0 : users.map((u) => ({
                    name: u.user.username,
                    value: `<@${u.id}>`,
                    inline: true,
                })),
            },
        ],
    });
});
exports.default = roleInfo;
//# sourceMappingURL=roleInfo.js.map