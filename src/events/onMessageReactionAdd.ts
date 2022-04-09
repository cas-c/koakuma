import fs from "fs";
import {
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  User,
} from "discord.js";
const config = require("../../config.json");

const onMessageReactionAdd = async (
  messageReaction: MessageReaction | PartialMessageReaction,
  user: User | PartialUser
) => {
  if (
    messageReaction.message.channelId !== config.roleChannel ||
    messageReaction.message.author?.id === messageReaction.client.user?.id
  ) {
    return;
  }
  const roleJson = require(`${process.cwd()}/data/roles/${
    messageReaction.message.id
  }.json`);
  if (roleJson && roleJson?.roleId && user) {
    const targetUser = await messageReaction.message.guild?.members.fetch(
      user.id
    );
    await targetUser?.roles.add(roleJson.roleId);
  }
  return;
};

export default onMessageReactionAdd;
