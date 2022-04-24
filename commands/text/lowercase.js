const { SlashCommandBuilder } = require('@discordjs/builders');
const { execute } = require('./base64');

// Convert text to lower/upper case.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('case-convert')
		.setDescription('Converts text to lower/upper case.')
		.addSubcommand(new SlashCommandBuilder()
			.setName('lower')
			.setDescription('Converts text to lower case.')
			.addStringOption(option =>
				option.setName('text')
					.setRequired(true)
					.setDescription('The text to convert.'))
			.setExecute(async (interaction) => {
				const text = interaction.options.getString('text');
				await interaction.reply(text.toLowerCase());
			},
			))
		.addSubcommand(new SlashCommandBuilder()
			.setName('upper')
			.setDescription('Converts text to upper case.')
			.addStringOption(option =>
				option.setName('text')
					.setRequired(true)
					.setDescription('The text to convert.'))
			async execute(interaction) {
				const text = interaction.options.getString('text');
				await interaction.reply(text.toUpperCase());
			},
			),
};
