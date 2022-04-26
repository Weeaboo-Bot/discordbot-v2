const { SlashCommandBuilder } = require('@discordjs/builders');

// Convert text to lower/upper case.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('string-case')
		.setDescription('Converts text to lower/upper case.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('lower')
				.setDescription('Converts text to lower case.')
				.addStringOption(option =>
					option
						.setName('input')
						.setDescription('The text to convert.')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('upper')
				.setDescription('Converts text to upper case.')
				.addStringOption(option =>
					option
						.setName('input')
						.setDescription('The text to convert.')
						.setRequired(true))),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		const output = input.toLowerCase();
		await interaction.reply(output);
	},


};
