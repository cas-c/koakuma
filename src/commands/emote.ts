import { Message, MessageAttachment } from "discord.js";

const emote = (message: Message, firstArgument: string) => {
  let emoteCodes = message.content.match(/[a]{0,1}:([a-zA-Z]*):([0-9]*)/);
  let emoteName = emoteCodes && emoteCodes[1];
  let emoteCode = emoteCodes && emoteCodes[2];
  if (!emoteCode) {
    return message.reply("something went wrong, sorry?");
  }
  if (message.content.includes("<a:") || firstArgument.includes("a:")) {
    return message.reply(`https://cdn.discordapp.com/emojis/${emoteCode}.gif`);
  } else {
    return message.reply(`https://cdn.discordapp.com/emojis/${emoteCode}.webp`);
  }
};

export default emote;
