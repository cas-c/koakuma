import { Client, Intents } from "discord.js";
const config = require("../config.json");

const Koakuma = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ]
});

Koakuma.once('ready', (client: Client) => {
    console.log("ready");
})

Koakuma.login(config.token);