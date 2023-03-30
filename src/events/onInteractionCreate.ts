import getWebcamImage from "../utils/getWebcamImage"
import { Interaction } from "discord.js"
import { type Koakuma } from "../index";

const onInteractionCreate = async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'check') {
        const { attachment, hasNewImage} = await getWebcamImage();
        interaction.reply({
        files: attachment ? [attachment] : [],
        content: `${
          !hasNewImage && "No images found!"
        }`,
      });

      return;
    }

	const command = (interaction.client as Koakuma).commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
}


export default onInteractionCreate;