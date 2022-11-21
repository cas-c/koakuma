import getWebcamImage from "../utils/getWebcamImage"

const onInteractionCreate = async (interaction: any) => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'check') {
        const { attachment, hasNewImage} = await getWebcamImage();
        interaction.reply({
        files: attachment ? [attachment] : [],
        content: `${
          !hasNewImage && "No images found!"
        }`,
      });
    }
}


export default onInteractionCreate;