const { SlashCommandBuilder } = require('@discordjs/builders');
const WeabooEmbed = require('../../structures/client/WeabooEmbed');
const { embedURL, trimArray } = require('../../utils/Utils');
const { error } = require('../../utils/ChalkConfig');

const displayFmts = {
	jpg: 'JPEG',
	png: 'PNG',
	gif: 'GIF',
	webp: 'WebP',
};
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	PARTNERED_SERVER_OWNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	EARLY_VERIFIED_DEVELOPER: 'Early Verified Bot Developer',
};
const deprecated = ['DISCORD_PARTNER', 'VERIFIED_DEVELOPER'];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-info')
		.setDescription('Get information about a user.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('avatar')
				.setDescription('Get the avatar of a user.')
				.addUserOption(option =>
					option
						.setName('user')
						.setDescription('The user to get avatar of.')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('id')
				.setDescription('Get the ID of a user.')
				.addUserOption(option =>
					option
						.setName('user')
						.setDescription('The user to get ID of.')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('info')
				.setDescription('Get information about a user.')
				.addUserOption(option =>
					option
						.setName('user')
						.setDescription('The user to get information about.')
						.setRequired(true))),
	async execute(interaction) {
		const user = interaction.options.getUser('user');

		switch (interaction.options._subcommand) {
		case 'avatar': {
			const formats = ['png'];
			if (user.avatar) formats.push('jpg', 'webp');
			const format = user.avatar && user.avatar.startsWith('a_') ? 'gif' : 'png';
			if (format === 'gif') formats.push('gif');

			const avatarEmbed = new WeabooEmbed()
				.setTitle(`Avatar for ${user.tag}`)
				.setDescription(
					formats
						.map((fmt) =>
							embedURL(
								displayFmts[fmt],
								user.displayAvatarURL({ format: fmt, size: 2048 }),
							),
						)
						.join(' | '),
				)
				.setImage(user.displayAvatarURL({ format: format, size: 2048 }));
			await interaction.reply({ embeds: [avatarEmbed] });
			break;
		}
		case 'id': {
			await interaction.reply(`${user.tag}'s ID is ${user.id}`);
			break;
		}
		case 'info': {
			const userFlags = user.flags
				? user.flags.toArray().filter((flag) => !deprecated.includes(flag))
				: [];
			const userEmbed = new WeabooEmbed()
				.setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
				.setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ format: 'png', dynamic: true }) })
				.addField(
					'❯ Discord Join Date',
					user.createdAt.toLocaleString(),
					true,
				)
				.addField('❯ ID', user.id, true)
				.addField('❯ Bot?', user.bot ? 'Yes' : 'No', true)
				.addField(
					'❯ Flags',
					userFlags.length
						? userFlags.map((flag) => flags[flag]).join(', ')
						: 'None',
				);
			if (interaction.guild) {
				try {
					const guildMember = await interaction.guild.members.fetch(user.id);
					const defaultRole = interaction.guild.roles.cache.get(interaction.guild.id);
					const roles = guildMember.roles.cache.filter((role) => role.id !== defaultRole.id).sort((a, b) => b.position - a.position)
						.map((role) => role.name);
					userEmbed.addField(
						'❯ Server Join Date',
						guildMember.joinedAt.toLocaleString(),
						true,
					)
						.addField(
							'❯ Highest Role',
							guildMember.roles.highest.id === defaultRole.id
								? 'None'
								: guildMember.roles.highest.name,
							true,
						)
						.addField(
							'❯ Hoist Role',
							guildMember.roles.hoist ? guildMember.roles.hoist.name : 'None',
							true,
						)
						.addField(
							`❯ Roles (${roles.length})`,
							roles.length ? trimArray(roles, 6).join(', ') : 'None',
						)
						.setColor(guildMember.displayHexColor);
				} catch {
					userEmbed.setFooter({ text : 'Failed to resolve member, showing basic user info instead.' });
				}
			}
			await interaction.reply({ embeds: [userEmbed] });
			break;
		}
		default:
			error(`Unknown subcommand ${interaction.options._subcommand}`);
			throw new Error(`Unknown subcommand ${interaction.options._subcommand}`);
		}
	},
};
