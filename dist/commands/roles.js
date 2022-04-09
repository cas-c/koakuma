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
const roles = (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.guild)
        return;
    const allRoles = yield message.guild.roles.fetch();
    return message.reply({
        embeds: [
            {
                title: `Mentionable server roles with more than 1 member`,
                description: "do `koa!roleinfo id` using the number next to the role name to see who has it",
                fields: allRoles
                    .filter((r) => r.members.size > 1 && r.mentionable)
                    .map((role) => {
                    return {
                        name: role.name,
                        value: role.id,
                        inline: true,
                    };
                }),
            },
        ],
    });
});
exports.default = roles;
//# sourceMappingURL=roles.js.map