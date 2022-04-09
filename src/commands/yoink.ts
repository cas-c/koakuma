import { Message, MessageAttachment } from "discord.js";

const yoink = async (message: Message) => {
  const emoteCodes = message.content.match(/<[:a]{1,2}([a-zA-Z]*):([0-9]*)>/);
  const emoteName = (emoteCodes && emoteCodes[1]) || "";
  const emoteCode = (emoteCodes && emoteCodes[2]) || "";
  if (!emoteName || !emoteCode) {
    return message.reply("something went wrong, sorry~");
  }
  let response;
  if (message.content.includes("<a:")) {
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
