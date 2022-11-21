import {
  Client,
  Intents,
  User,
  GuildTextBasedChannel,
  Message,
  MessageAttachment,
} from "discord.js";
import { ActivityTypes } from "discord.js/typings/enums";

import commandHandler from "./commandHandler";

import redis from "./services/redis";

import onMessageReactionAdd from "./events/onMessageReactionAdd";
import onMessageReactionRemove from "./events/onMessageReactionRemove";
import onVoiceStateUpdate from "./events/onVoiceStateUpdate";
import onInteractionCreate from "./events/onInteractionCreate";

const config = require("../config.json");

const Koakuma = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"],
});

let mom: User | null;
let homeChannel: GuildTextBasedChannel | null;
let roleChannel: GuildTextBasedChannel | null;
const SEPTAPUS = "127296623779774464";
Koakuma.once("ready", async (client: Client) => {
  console.log("ready!");
  redis.connect();

  client.user?.setActivity({
    type: ActivityTypes.WATCHING,
    name: `since ${new Date(Date.now()).toTimeString().split("(")[0]}`,
  });
  const getRoleMessagesIntoCache = () => {};

  // todo: I might just make these the same thing and switch which gets assigned as 'homeChannel' based on config.
  // for now this is fine since i kinda wanna work on it both in the server and in dms. not a big deal
  mom = await Koakuma.users.fetch(config.momId);
  homeChannel = (await Koakuma.channels.fetch(
    config.homeChannel
  )) as GuildTextBasedChannel;

  getRoleMessagesIntoCache();
  roleChannel = (await Koakuma.channels.fetch(
    config.roleChannel
  )) as GuildTextBasedChannel;
  if (config.env && config.env !== "dev") {
    homeChannel.send(config.loginMessage);
  } else {
    mom.send(config.loginMessage);
  }
})
  .on("error", console.error)
  .on("messageCreate", async (message: Message) => {
    if (message.author.bot && message.author.id === SEPTAPUS) {
      if (message.cleanContent.includes("https://i.imgur")) {
        message.reply({
          attachments: [
            new MessageAttachment(message.cleanContent.split(": ")[1]),
          ],
        }); //;
      }
    }

    if (message.author.bot) return; // ignore bots ;_;
    // prefix handling!
    if (
      message.cleanContent.length > 2 &&
      message.cleanContent.toLowerCase().startsWith(config.prefix)
    ) {
      commandHandler(message);
    }
  })
  .on("messageReactionAdd", onMessageReactionAdd)
  .on("messageReactionRemove", onMessageReactionRemove)
  .on("voiceStateUpdate", onVoiceStateUpdate)
  .on("interactionCreate", onInteractionCreate)
Koakuma.login(config.token);
