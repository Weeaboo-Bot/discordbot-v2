const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get info about a user or a server!')
		.addSubcommandGroup(group =>
			group
				.setName('user')
				.setDescription('Get info about a user!')
				.addSubcommand(subcommand =>
					subcommand
						.setName('user')
						.setDescription('Get info about a user!')
						.addUserOption(option =>
							option
								.setName('user')
								.setDescription('The user to get info about!')
								.setRequired(true))
				.addSubcommand(subcommand =>
					subcommand
						.setName('avatar')
						.setDescription('Get the avatar of a user!')
						.addUserOption(option =>
							option
								.setName('user')
								.setDescription('The user to get info about!')
								.setRequired(true))
				.addSubcommand(subcommand =>
					subcommand
						.setName('id')
						.setDescription('Get the ID of a user!')
						.addUserOption(option =>
							option
								.setName('user')
								.setDescription('The user to get info about!')
								.setRequired(true))
				.addSubcommand(subcommand =>
					subcommand
						.setName('roles')
						.setDescription('Get the roles of a user!')
						.addUserOption(option =>
							option
								.setName('user')
								.setDescription('The user to get info about!')
								.setRequired(true))
				.addSubcommand(subcommand =>
					subcommand
						.setName('joined')
						.setDescription('Get the date the user joined!')
						.addUserOption(option =>
							option
								.setName('user')
								.setDescription('The user to get info about!')
								.setRequired(true))
				.addSubcommand(subcommand =>
					subcommand
						.setName('status')
						.setDescription('Get the status of a user!')
						.addUserOption(option =>
							option
								.setName('user')
								.setDescription('The user to get info about!')
								.setRequired(true))
				.addSubcommand(subcommand =>
					subcommand
						.setName('discriminator')
						.setDescription('Get the discriminator of a user!')
						.addUserOption(option =>
							option
								.setName('user')
								.setDescription('The user to get info about!')
								.setRequired(true))))
		.addSubcommandGroup(group =>
			group
				.setName('server')
				.setDescription('Get info about a server!')
				.addSubcommand(subcommand =>
					subcommand
						.setName('server')
						.setDescription('Get info about a server!'))
				.addSubcommand(subcommand =>
					subcommand
						.setName('icon')
						.setDescription('Get the icon of a server!')
						

		
		
				

};
