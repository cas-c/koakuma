import { Message } from "discord.js";

const roleInfo = async (message: Message, roleId: string) => {
  const users = (await message.guild?.roles.fetch(roleId))?.members.map(
    (m) => `${m.displayName} (${m.user.username})`
  );
  if (!users) {
    return message.reply(
      "couldn't grab user info for this role for some reason :c"
    );
  }
  console.log(users);
  return message.reply(users.join(", "));
};
export default roleInfo;
