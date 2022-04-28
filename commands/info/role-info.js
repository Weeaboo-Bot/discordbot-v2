const { SlashCommandBuilder, bold } = require('@discordjs/builders');
const { Table } = require('embed-table');
const WeabooEmbed = require('../../structures/client/WeabooEmbed');


const table = new Table({
	titles: ['Permission', 'Exists'],
	titleIndexes: [0, 32],
	columnIndexes: [0, 32],
	start: '`',
	end: '`',
	padEnd: 3,
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role-info')
		.setDescription('Get information about a role.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('info')
				.setDescription('Get information about a role.')
				.addRoleOption(option =>
					option
						.setName('role')
						.setDescription('The role to get information about.')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('in-role')
				.setDescription('Get members of a role.')
				.addRoleOption(option =>
					option
						.setName('role')
						.setDescription('The role to get members of.')
						.setRequired(true))),
	async execute(interaction) {
		const role = interaction.options.getRole('role');
		const perms = role.permissions.serialize();

		switch (interaction.options._subcommand) {
		case 'info': {
			const roleInfoEmbed = new WeabooEmbed()
				.setTitle(`Role Information for ${role.name}`)
				.addField(bold('Role Info'), '----')
				.addFields(
					{ name: '❯ Role ID', value: role.id, inline: true },
					{ name: '❯ Role Name', value: role.name, inline: true },
					{ name: '❯ Role Color', value: role.hexColor, inline: true },
					{ name: '❯ Role Creation Date', value: role.createdAt.toLocaleString(), inline: true },
					{ name: '❯ Role Position', value: role.position, inline: true },
					{ name: '❯ Role Hoisted', value: role.hoist ? 'Yes' : 'No', inline: true },
					{ name: '❯ Role Mentionable', value: role.mentionable ? 'Yes' : 'No', inline: true },
					{ name: '----', value: '----', inline: true },
					{ name: '❯ Role Permissions', value: '----', inline: true },
				);


			Object.keys(perms).forEach((key) => {
				table.addRow([key, perms[key] ? 'Yes' : 'No'], { override: 0 });
			});
			roleInfoEmbed.addFields(table.field());
			await interaction.reply({ embeds: [roleInfoEmbed] });
			break;
		}
		case 'in-role': {
			const members = role.fetch();

			const allMembers = members
				.map((m) => {
					return `${m.user.tag}${m.user.bot ? ' [BOT]' : ''}`;
				})
				.sort((a, b) => a.localeCompare(b))
				.join(', ');

			if (!allMembers) {
				return interaction.reply('There are no members in that role!');
			}

			if (allMembers.length > 2048) {
				return interaction.reply('Too much members in that role! I couldn\'t send the information!');
			}

			const roleMembersEmbed = new WeabooEmbed()
				.setTitle(`Members in ${role.name}`)
				.setAuthor({ name: `${role.name} (${role.id})`, iconURL: interaction.guild.iconURL() })
				.setColor(role.hexColor)
				.setDescription(`\`\`\`css\n${allMembers}\`\`\``)
				.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });
			await interaction.reply({ content:  `All members with the **${role.name}** role!`, embeds: [roleMembersEmbed] });
			break;
		}
		default:
			return interaction.reply('Invalid subcommand!');
		}

	},
};