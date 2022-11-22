import {
  Guild,
  GuildTextBasedChannel,
  Message,
  TextBasedChannel,
  AttachmentBuilder,
} from "discord.js";
import fetch from "node-fetch";
import sharp from "sharp";

const pointAt = async (
  targetImage: string | Buffer,
  targetChannel: TextBasedChannel
) => {
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
      { input: targetImage, gravity: "northwest" },
      {
        input: pointImage,
        gravity: "southeast",
      },
    ])
    .png()
    .toBuffer()
    .then((value) => {
      const attachment = new AttachmentBuilder(value, { name: 'intruder.png' });
      targetChannel.send({ files: [attachment] });
    });
};

export default pointAt;
