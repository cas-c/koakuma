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
const config = require("../config.json");
const { REST, Routes } = require('discord.js');
const commands = [
    {
        name: 'check',
        description: 'Checks the camera for the most recent image.',
    },
];
const rest = new REST({ version: '10' }).setToken(config.token);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Started refreshing application (/) commands.');
        yield rest.put(Routes.applicationCommands(config.clientId), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
}))();
//# sourceMappingURL=registerSlashCommands.js.map