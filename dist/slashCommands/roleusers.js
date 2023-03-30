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
exports.execute = exports.command = void 0;
const builders_1 = require("@discordjs/builders");
exports.command = new builders_1.SlashCommandBuilder()
    .setName('roleusers')
    .setDescription('Displays a list of users with a role')
    .addRoleOption(option => {
    return option.setName('role').setDescription('The role to list all users for').setRequired(true);
});
const execute = (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { options } = interaction;
    const chosenRole = options.getRole("role");
    if (chosenRole === null || chosenRole === void 0 ? void 0 : chosenRole.id) {
        const guildRole = yield ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.roles.cache.get(chosenRole === null || chosenRole === void 0 ? void 0 : chosenRole.id));
        const members = guildRole === null || guildRole === void 0 ? void 0 : guildRole.members.map(member => `<@${member.user.id}>`).join('\n');
        const embed = new builders_1.EmbedBuilder().setColor([236, 41, 41]).setTitle(`users with ${chosenRole.name}`).setDescription(members || 'none');
        yield interaction.reply({ embeds: [embed] });
    }
});
exports.execute = execute;
module.exports = {
    data: exports.command, execute: exports.execute
};
//# sourceMappingURL=roleusers.js.map