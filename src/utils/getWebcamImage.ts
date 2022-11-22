
import { load } from "cheerio";
import { AttachmentBuilder } from "discord.js"
const config = require('../../config.json')
const getWebcamImage = async () => {
    let previousWebcamImage
    const fetchResponse = await fetch(config.cameraSource);
    const galleryPage = await fetchResponse.text();

    const $ = load(galleryPage);
    const mostRecentImage = $("a", ".gallery-wrapper").first()[0]?.attribs
      ?.href;
    const hasNewImage =
      mostRecentImage && mostRecentImage !== previousWebcamImage;
    if (mostRecentImage && mostRecentImage !== previousWebcamImage) {
      previousWebcamImage = `${config.imageSource}${mostRecentImage}`;
    }

    const attachment = previousWebcamImage && new AttachmentBuilder(previousWebcamImage, { name: 'image' })
    return {
        attachment,
        mostRecentImage, 
        hasNewImage,
        previousWebcamImage,
        
    }
}
export default getWebcamImage