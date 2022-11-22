// we're gonna check a webcam.
import { Message, AttachmentBuilder } from "discord.js";
import getWebcamImage from "../utils/getWebcamImage"
const config = require("../../config.json");

let previousWebcamImage = "";
let lastFetchedTimestamp = 0;
let previousAttachment: AttachmentBuilder;

const check = async (message: Message) => {
  if (
    lastFetchedTimestamp !== 0 &&
    lastFetchedTimestamp > Date.now() - 600000
  ) {
    const earlyReturnAttachment = new AttachmentBuilder(previousWebcamImage);
    message.reply({
      files: [earlyReturnAttachment],
      content: `last capture time: <t:${Math.floor(
        lastFetchedTimestamp / 1000
      )}:R>`,
    });
    return;
  }
  try {

    const { attachment, hasNewImage } = await getWebcamImage();
    const previousTimestamp = lastFetchedTimestamp;
    previousAttachment = attachment || previousAttachment;
    lastFetchedTimestamp = Date.now();
    message.reply({
      files: attachment ? [attachment] : [],
      content: `${
        previousTimestamp === 0
          ? ""
          : `previous: <t:${Math.floor(previousTimestamp / 1000)}:R> `
      }${
        hasNewImage
          ? `current: <t:${Math.floor(lastFetchedTimestamp / 1000)}:R>`
          : "No images found!"
      }`,
    });
  } catch (e) {
    console.error(e);
  }
  return;
};

export default check;
