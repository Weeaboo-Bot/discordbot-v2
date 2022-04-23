const { SlashCommandBuilder } = require('@discordjs/builders');
const { isRomanNumeral } = require('../../utils/Utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roman')
		.setDescription('Converts a number to roman numerals.')
		.addIntegerOption(option =>
			option.setName('number')
				.setRequired(true)
				.setDescription('The number to convert.')),
	async execute(interaction) {
		const number = interaction.options.getInteger('number');
		const roman = isRomanNumeral(number);
		await interaction.reply(`${number} is${roman ? '' : ' not'} a roman numeral.`);
	},
};

