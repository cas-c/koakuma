import { Guild, Message, MessageAttachment } from "discord.js";
import fetch from "node-fetch";
import sharp from "sharp";
import redis from "../services/redis";

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
  const pointImage = await (
    await fetch(
      "https://cdn.discordapp.com/attachments/590652659418005544/982848340960116816/point.png"
    )
  ).buffer();
  sharp({
    create: {
      width: 1050,
      height: 850,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: authorImage, gravity: "northwest" },
      {
        input: pointImage,
        gravity: "southeast",
      },
    ])
    .png()
    .toBuffer()
    .then((value) => {
      const attachment = new MessageAttachment(value, "intruder.png");
      message.channel.send({ files: [attachment] });
    });
};

export default who;
