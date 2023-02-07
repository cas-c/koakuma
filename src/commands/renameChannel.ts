import { ChannelType, Message } from "discord.js";

const renameChannel = async (message: Message, newChannelName: string) => {
  if (message.channel.type !== ChannelType.GuildText) {
    message.reply("This command isn't supported here!");
    return;
  }

  try {
    const originalChannelName = message.channel.name;
    const channel = await message.channel.setName(newChannelName);
    message.reply("done~ updated channel name from " + originalChannelName + " to " + channel.name)
    return;
  } catch (e) {
    console.log("error in rename channel", e)
    message.reply("something happened, not sure what :s ask cassie");
  }
  console.log("could not rename channel", message.channelId);
};

export default renameChannel;
