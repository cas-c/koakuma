import fs from "fs";
import { GuildTextBasedChannel, Message } from "discord.js";
const config = require("../../config.json");

const addRole = async (message: Message, roleName: string) => {
  const created = await message.guild?.roles.create({
    name: roleName,
    mentionable: true,
  });

  if (created) {
    const roleChannel = (await message.guild?.channels.cache
      .get(config.roleChannel)
      ?.fetch()) as GuildTextBasedChannel;
    const roleMessage = await roleChannel?.send(
      `New mentionable role: <@&${created.id}>.  React to this message to get this role added to you automatically!`
    );
    const roleObjectPath = `${process.cwd()}/data/roles/${roleMessage.id}.json`;
    const exists = fs.existsSync(roleObjectPath);
    const roleObject = {
      messageId: roleMessage?.id,
      roleId: created?.id,
      name: created?.name,
    };
    if (!exists) {
      fs.writeFileSync(roleObjectPath, JSON.stringify(roleObject, null, 2));
    }
    const targetUser = await message.guild?.members.fetch(message.author.id);
    await targetUser?.roles.add(created.id);
    message.reply("done~");
  }
};

export default addRole;
