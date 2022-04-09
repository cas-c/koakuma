import { Message } from "discord.js";

const roles = async (message: Message) => {
  if (!message.guild) return;
  const allRoles = await message.guild.roles.fetch();
  return message.reply({
    embeds: [
      {
        title: `Mentionable server roles with more than 1 member`,
        description:
          "do `koa!roleinfo id` using the number next to the role name to see who has it",
        fields: allRoles
          .filter((r) => r.members.size > 1 && r.mentionable)
          .map((role) => {
            return {
              name: role.name,
              value: role.id,
              inline: true,
            };
          }),
      },
    ],
  });
};

export default roles;
