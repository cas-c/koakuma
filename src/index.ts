import { Client, Intents, User, GuildChannel, AnyChannel, GuildTextBasedChannel, GuildMember, Message } from "discord.js";
import check from "./commands/check";
const config = require("../config.json");

const Koakuma = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

let mom: User | null;
let homeChannel: GuildTextBasedChannel | null;

Koakuma
    .once('ready', async (client: Client) => {
        console.log("ready!");

        client.user?.setActivity({ type: 'WATCHING', name: `since ${new Date(Date.now()).toTimeString().split('(')[0]}` });

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
    .on('error', console.error)
    .on('messageCreate', async (message: Message) => {
        // prefix handling!
        if (message.cleanContent.length > 2 && message.cleanContent.startsWith(config.prefix)) {
            const splitBySpaces = message.cleanContent.split(' ');
            const textCommand = splitBySpaces[0].split('!');
            const assumedMainCommand = textCommand[1];
            // mom?.send(`${assumedMainCommand} from ${message.channel} in ${message.guild}`);
            // i love switch dont tell anyone theyll call me cringe and unfunctionalpilled
            switch (assumedMainCommand) {
                case 'check':
                    check(message, splitBySpaces.length > 0 ? splitBySpaces[1] : undefined)
                default:
                    return;
            }
        }
    });

Koakuma.login(config.token);