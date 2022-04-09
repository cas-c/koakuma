import { Message } from "discord.js";
import addRole from "./commands/addRole";
import check from "./commands/check";
import emote from "./commands/emote";
import ping from "./commands/ping";
import roleInfo from "./commands/roleInfo";
import roles from "./commands/roles";
import yoink from "./commands/yoink";

const commandHandler = (message: Message) => {
  const splitBySpaces = message.cleanContent.split(" ");
  const textCommand = splitBySpaces[0].split("!");
  const assumedMainCommand = textCommand[1].toLowerCase();
  const assumedFirstArgument = splitBySpaces[1];
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
    default:
      return;
  }
};

export default commandHandler;
