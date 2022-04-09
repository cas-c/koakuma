import { Message } from "discord.js";

const roleInfo = async (message: Message, roleId: string) => {
  const guild = await message.guild?.fetch();
  const members = await message.guild?.members?.fetch();
  const role = await guild?.roles.fetch(roleId);
  const users = role?.members;
  const usersWithRole = users?.map(
    (m) => `${m.displayName} (${m.user.username})`
  );
  if (!usersWithRole || usersWithRole.length === 0) {
    return message.reply(
      "couldn't grab user info for this role for some reason :c"
    );
  }
  return message.reply({
    embeds: [
      {
        title: `Members with ${role?.name}: ${usersWithRole.length}.`,
        description:
          (users?.size || 0) > 25
            ? "List of first 25 members with this role."
            : "Here's a list of all members with this role!",
        fields: users?.map((u) => ({
          name: u.user.username,
          value: `<@${u.id}>`,
          inline: true,
        })),
      },
    ],
  });
};
export default roleInfo;
