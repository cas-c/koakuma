import { Client, Intents, User, GuildChannel, AnyChannel, GuildTextBasedChannel, GuildMember } from "discord.js";
const config = require("../config.json");

const Koakuma = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ]
});

let mom: User | null;
let homeChannel: GuildTextBasedChannel | null;
Koakuma.once('ready', async (client: Client) => {
    console.log("ready");

    // todo: I might just make these the same thing and switch which gets assigned as 'homeChannel' based on config.
    // for now this is fine since i kinda wanna work on it both in the server and in dms. not a big deal
    mom = await Koakuma.users.fetch(config.momId);
    homeChannel = await Koakuma.channels.fetch(config.homeChannel) as GuildTextBasedChannel;
    if (config.env && config.env !== "dev") {
        homeChannel.send(config.loginMessage)
    } else {
        mom.send(config.loginMessage);
    }
})

Koakuma.login(config.token);