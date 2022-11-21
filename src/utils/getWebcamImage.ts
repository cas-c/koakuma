
import { load } from "cheerio";
import { MessageAttachment } from "discord.js"

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

    const attachment = previousWebcamImage && new MessageAttachment(previousWebcamImage)
    return {
        attachment,
        mostRecentImage, 
        hasNewImage,
        previousWebcamImage,
        
    }
}
export default getWebcamImage