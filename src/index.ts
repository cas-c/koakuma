import {
  Client,
  User,
  GuildTextBasedChannel,
  Message,
  GatewayIntentBits, Partials, ActivityType, AttachmentBuilder, Collection 
} from "discord.js";

import commandHandler from "./commandHandler";

import redis from "./services/redis";

import onMessageReactionAdd from "./events/onMessageReactionAdd";
import onMessageReactionRemove from "./events/onMessageReactionRemove";
import onVoiceStateUpdate from "./events/onVoiceStateUpdate";
import onInteractionCreate from "./events/onInteractionCreate";
import path from "path"
import { readdirSync } from "fs"

const config = require("../config.json");

export type Koakuma = Client & { commands?: any };

const Koakuma: Koakuma = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User],
})

Koakuma.commands = new Collection();

const commandsPath = path.join(__dirname, 'slashCommands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		Koakuma.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

let mom: User | null;
let homeChannel: GuildTextBasedChannel | null;
let roleChannel: GuildTextBasedChannel | null;
const SEPTAPUS = "127296623779774464";
Koakuma.once("ready", async (client: Client) => {
  console.log("ready!");
  redis.connect();

  client.user?.setActivity({
    type: ActivityType.Watching,
    name: `the library`,
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
        const attachment = new AttachmentBuilder(message.cleanContent.split(": ")[1], { name: 'septasus.png' });
        message.reply({
          files: [attachment]
        });
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
