// we're gonna check a webcam.
import { Message, MessageAttachment } from "discord.js";
import fetch from "node-fetch";
import { load } from "cheerio";
const config = require("../../config.json");

let previousWebcamImage = "";
let lastFetchedTimestamp = 0;

const check = async (message: Message, cameraNumber?: string) => {
  if (
    lastFetchedTimestamp !== 0 &&
    lastFetchedTimestamp > Date.now() - 600000
  ) {
    // Use the helpful Attachment class structure to process the file for you
    const earlyReturnAttachment = new MessageAttachment(previousWebcamImage);
    message.reply({
      files: [earlyReturnAttachment],
      content: `last capture time: <t:${Math.floor(
        lastFetchedTimestamp / 1000
      )}:R>`,
    });
    return;
  }
  try {
    const fetchResponse = await fetch(config.cameraSource);
    const galleryPage = await fetchResponse.text();

    const $ = load(galleryPage);
    const mostRecentImage = $("a", ".gallery-wrapper").first()[0].attribs.href;
    if (mostRecentImage && mostRecentImage !== previousWebcamImage) {
      previousWebcamImage = `${config.imageSource}${mostRecentImage}`;
    } else {
      previousWebcamImage = "error";
    }
    const previousTimestamp = lastFetchedTimestamp;
    lastFetchedTimestamp = Date.now();
    // Use the helpful Attachment class structure to process the file for you
    const attachment = new MessageAttachment(previousWebcamImage);

    // interaction.reply({ files: [attachment] });
    message.reply({
      files: [attachment],
      content: `${
        previousTimestamp === 0
          ? ""
          : `previous: <t:${Math.floor(previousTimestamp / 1000)}:R> `
      }current: <t:${Math.floor(lastFetchedTimestamp / 1000)}:R>`,
    });
  } catch (e) {
    console.error(e);
  }
  return;
};

export default check;
