const { SlashCommandBuilder, bold } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Table } = require('embed-table');


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
		.addRoleOption(option =>
			option.setName('role')
				.setDescription('The role to get information about.')
				.setRequired(true)),
	async execute(interaction) {
		const role = interaction.options.getRole('role');
		const perms = role.permissions.serialize();
		const roleInfoEmbed = new MessageEmbed()
			.setTitle(`Role Information for ${role.name}`)
			.setColor('#0d541a')
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
		interaction.reply({ embeds: [roleInfoEmbed] });
	},
};