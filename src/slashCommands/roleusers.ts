import { SlashCommandBuilder, EmbedBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';


export const command = new SlashCommandBuilder()
.setName('roleusers')
.setDescription('Displays a list of users with a role')
.addRoleOption(option => {
    return option.setName('role').setDescription('The role to list all users for').setRequired(true)
});

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const { options } = interaction;
    const chosenRole = options.getRole("role");
    if (chosenRole?.id) {
        const guildRole = await interaction.guild?.roles.cache.get(chosenRole?.id);
        const members = guildRole?.members.map(member => `<@${member.user.id}>`).join('\n');
        const embed = new EmbedBuilder().setColor([236, 41, 41]).setTitle(`users with ${chosenRole.name}`).setDescription(members || 'none' as string)
        await interaction.reply({ embeds: [embed] })
    }
}

module.exports = {
  data: command, execute
};
