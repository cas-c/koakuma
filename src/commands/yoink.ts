import { Message, MessageAttachment } from "discord.js";

const yoink = async (message: Message, firstArgument: string) => {
  let emoteCodes = message.content.match(/[a]{0,1}:([a-zA-Z]*):([0-9]*)/);
  let emoteName = emoteCodes && emoteCodes[1];
  let emoteCode = emoteCodes && emoteCodes[2];
  if (!emoteName || !emoteCode) {
    return message.reply("something went wrong, sorry?");
  }
  let response;
  if (message.content.includes("<a:") || firstArgument.includes("a:")) {
    response = await message.guild?.emojis.create(
      `https://cdn.discordapp.com/emojis/${emoteCode}.gif`,
      emoteName
    );
  } else {
    response = await message.guild?.emojis.create(
      `https://cdn.discordapp.com/emojis/${emoteCode}.webp`,
      emoteName
    );
  }

  if (response?.name) {
    return await (await message.reply("done~")).react(response);
  } else {
    return message.reply("something went wrong, sorry~");
  }
};

export default yoink;
