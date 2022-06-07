import { Guild, Message, MessageAttachment } from "discord.js";
import fetch from "node-fetch";
import sharp from "sharp";
import redis from "../services/redis";
import pointAt from "../utils/pointAt";

const point = async (message: Message, targetId: string) => {
  if (!message.guild || !message.member) return;
  let memberId = targetId;
  let target;

  if (!memberId) {
    target = message.author;
  } else {
    target = await message.client.users.fetch(memberId);
  }

  const targetImage = await (
    await fetch(`${target.displayAvatarURL()}?size=100`)
  ).buffer();

  await pointAt(targetImage, message.channel);
};

export default point;
