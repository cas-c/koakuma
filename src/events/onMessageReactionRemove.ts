import fs from "fs";
import {
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  User,
} from "discord.js";
const config = require("../../config.json");

const onMessageReactionRemove = async (
  messageReaction: MessageReaction | PartialMessageReaction,
  user: User | PartialUser
) => {
  if (messageReaction.message.channelId !== config.roleChannel) {
    return;
  }
  const roleJson = require(`${process.cwd()}/data/roles/${
    messageReaction.message.id
  }.json`);
  if (roleJson && roleJson?.roleId && user) {
    const targetUser = await messageReaction.message.guild?.members.fetch(
      user.id
    );
    await targetUser?.roles.remove(roleJson.roleId);
  }
  return;
};

export default onMessageReactionRemove;
