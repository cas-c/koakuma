import { Message, MessageAttachment } from "discord.js";

const emote = (message: Message) => {
  const emoteCodes = message.content.match(/<[a-zA-Z:]*([0-9]*)>/);
  const emoteCode = (emoteCodes && emoteCodes[1]) || "";
  if (message.content.includes("<a:")) {
    return message.reply(`https://cdn.discordapp.com/emojis/${emoteCode}.gif`);
  } else {
    return message.reply(`https://cdn.discordapp.com/emojis/${emoteCode}.webp`);
  }
};

export default emote;
