import { SlashCommandBuilder } from '@discordjs/builders'
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js'

export const command = new SlashCommandBuilder()
  .setName('roleusers')
  .setDescription('Displays a list of users with a role')
  .addRoleOption((option) => {
    return option
      .setName('role')
      .setDescription('The role to list all users for')
      .setRequired(true)
  })

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const { options } = interaction
  const chosenRole = options.getRole('role')
  if (chosenRole && chosenRole.id) {
    const members = await interaction.guild?.members.fetch() // get all the members first
    const membersWithRole = members
      ?.filter((member) =>
        member.roles.cache.some((role) => role.name === chosenRole.name),
      )
      .map((m) => m.toString()) // `<@${m}>`)
      .join('\n')

    const embed = new EmbedBuilder()
      .setColor([236, 41, 41])
      .setTitle('users with @' + chosenRole.name)
      .setDescription(membersWithRole ?? 'none')
    interaction.reply({ embeds: [embed] })
  }
}

module.exports = {
  data: command,
  execute,
}
