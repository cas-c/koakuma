const config = require("../../config.json");
import { REST, Routes } from "discord.js"
import { readdirSync } from "fs"
import path from "path"


const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, '../slashCommands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`../slashCommands/${file}`);
	commands.push(command.data.toJSON());
}

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