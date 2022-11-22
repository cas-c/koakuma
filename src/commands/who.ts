import {  Message } from "discord.js";
import fetch from "node-fetch";
import redis from "../services/redis";
import pointAt from "../utils/pointAt";

const who = async (message: Message, direction: string) => {
  if (!message.guild || !message.member) return;
  const currentMemberVoice = message.member.voice.channelId;
  let memberId;

  switch (direction) {
    case "left":
      // find who left from redis;
      memberId = await redis.get(`left:${currentMemberVoice}`);
      break;
    case "joined":
    default:
      // find who last joined from redis;
      memberId = await redis.get(`joined:${currentMemberVoice}`);
      break;
  }

  let target;

  if (!memberId) {
    target = message.author;
  } else {
    target = await message.client.users.fetch(memberId);
  }

  const authorImage = await (
    await fetch(`${target.displayAvatarURL()}?size=100`)
  ).buffer();

  await pointAt(authorImage, message.channel);
};

export default who;
