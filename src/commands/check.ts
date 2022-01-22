// we're gonna check a webcam.
import { Client, Message, MessageAttachment } from "discord.js";
import fetch from "node-fetch";
const config = require('../../config.json');

interface WindyWebcam {
    "id": string,
    "status": "active" | "inactive",
    "title": "Wellington",
    "image": {
        "current": {
            "icon": string;
            "thumbnail": string;
            "preview": string;
            "toenail": string;
        },
        "sizes": {
            "icon": {
                "width": number,
                "height": number
            },
            "thumbnail": {
                "width": number,
                "height": number
            },
            "preview": {
                "width": number,
                "height": number
            },
            "toenail": {
                "width": number,
                "height": number;
            }
        },
        "daylight": {
            "icon": string;
            "thumbnail": string;
            "preview": string;
            "toenail": string;
        },
        "update": number;
    }
}

let previousWebcamImage = '';
let lastFetchedTimestamp = 0;

async function blobToDataURL(blob: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.onabort = () => reject(new Error("Read aborted"));
        reader.readAsDataURL(blob);
    });
}

// const getThumbnailFromCamera = async () => {
//     const videoResponse = await fetch(`http://180.31.192.51:60001/mjpg/video.mjpg?t=${Date.now()}`)
//     const thumbnailBlob = await videoResponse.blob();
//     const thumbnail = await blobToDataURL(thumbnailBlob);
//     console.log(thumbnail);
//     return false;
// }
const check = async (message: Message, cameraNumber?: string) => {
    // if (cameraNumber && cameraNumber === "1") {
    //     const thumbnail = getThumbnailFromCamera();
    //     console.log(thumbnail);
    //     return;
    // }
    if (lastFetchedTimestamp !== 0 && lastFetchedTimestamp > Date.now() - 600000) {
        // Use the helpful Attachment class structure to process the file for you
        const earlyReturnAttachment = new MessageAttachment(previousWebcamImage);
        message.reply({ files: [earlyReturnAttachment], content: `last capture time: <t:${Math.floor(lastFetchedTimestamp / 1000)}:R>` });
        return;
    }
    try {
        const windyResponse = await fetch(`${config.windyUrl}&key=${config.windyKey}`);
        const previousTimestamp = lastFetchedTimestamp;
        lastFetchedTimestamp = Date.now();
        const body = await windyResponse.json();
        if (body.status === 'OK') {
            const ourWebcam: WindyWebcam = body.result.webcams[0];
            if (ourWebcam.status !== 'active') {
                message.reply("Webcam is inactive..!");
            }
            const webcamImage = `${ourWebcam.image.current.preview}?t=${lastFetchedTimestamp}`;
            if (webcamImage !== previousWebcamImage) {
                previousWebcamImage = webcamImage;
            }
            // Use the helpful Attachment class structure to process the file for you
            const attachment = new MessageAttachment(webcamImage);

            // interaction.reply({ files: [attachment] });
            message.reply({ files: [attachment], content: `${previousTimestamp === 0 ? '' : `previous: <t:${Math.floor(previousTimestamp / 1000)}:R> `}current: <t:${Math.floor(lastFetchedTimestamp / 1000)}:R>` })
        }
    } catch (e) {
        console.error(e);
    }
    return;
}

export default check;