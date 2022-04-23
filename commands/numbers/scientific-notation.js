const { SlashCommandBuilder } = require('@discordjs/builders');
const { toExponential } = require('../../utils/Utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scientific-notation')
		.setDescription('Converts a number to scientific notation.')
		.addIntegerOption(option =>
			option.setName('number')
				.setRequired(true)
				.setDescription('The number to convert.')),
	async execute(interaction) {
		const number = interaction.options.getInteger('number');
		await interaction.reply(`${toExponential(number)}`);
	},
};
