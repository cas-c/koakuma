const config = require("../../config.json");
import { REST, Routes } from "discord.js"

const commands = [
	{
		name: 'check',
		description: 'Checks the camera for the most recent image.',
	},
];

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(config.clientId), { body: commands });

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();