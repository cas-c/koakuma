import { Message } from "discord.js";

const ping = (message: Message) => {
  return message.reply("pong");
};

export default ping;
