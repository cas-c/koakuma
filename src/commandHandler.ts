import { Message, TextChannel } from "discord.js";

import addRole from "./commands/addRole";
import check from "./commands/check";
import emote from "./commands/emote";
import ping from "./commands/ping";
import point from "./commands/point";
import renameChannel from './commands/renameChannel';
import roleInfo from "./commands/roleInfo";
import roles from "./commands/roles";
import test from "./commands/test";
import who from "./commands/who";
import yoink from "./commands/yoink";

const commandHandler = async (message: Message) => {
  const splitBySpaces = message.cleanContent.split(" ");
  const textCommand = splitBySpaces[0].split("!");
  const assumedMainCommand = textCommand[1].toLowerCase();
  const assumedFirstArgument = splitBySpaces[1];
  splitBySpaces.shift();
  const fullStringArgument = splitBySpaces.join(' ');

  // mom?.send(`${assumedMainnCommand} from ${message.channel} in ${message.guild}`);
  // i love switch dont tell anyone theyll call me cringe and unfunctionalpilled
  switch (assumedMainCommand) {
    case "check":
      check(message);
      return;
    case "ping":
      ping(message);
      return;
    case "addrole":
      const roleString = splitBySpaces.slice(1).join(" ");
      addRole(message, roleString);
      return;
    case "roleinfo":
      roleInfo(message, assumedFirstArgument);
      return;
    case "roles":
      roles(message);
      return;
    case "emote":
      emote(message, assumedFirstArgument);
      return;
    case "yoink":
      yoink(message, assumedFirstArgument);
      return;
    case "who":
      who(message, assumedFirstArgument);
      return;
    case "test":
      test(message);
      return;
    case "point":
      if (message.mentions.repliedUser) {
        return point(message, message.mentions.repliedUser.id);
      } else if (message.mentions.members?.size) {
        return message.mentions.members?.forEach((member) =>
          point(message, member.id)
        );
      } else if (assumedFirstArgument === "random") {
        const members = await message.guild?.members.fetch();
        const memberArray = Object.values(members?.toJSON() || {}) || [];
        const count = memberArray.length;
        const target =
          memberArray.length > 0
            ? memberArray[Math.floor(Math.random() * count)]
            : message.author;
        point(message, target.id);
      } else {
        point(message, message.author.id);
      }
      return;
    case "rc":
    case "renamechannel":
      renameChannel(message, fullStringArgument);
      return
    default:
      return;
  }
};

export default commandHandler;
