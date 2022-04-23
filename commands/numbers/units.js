const { SlashCommandBuilder } = require('@discordjs/builders');
const { formatNumber } = require('../../utils/Utils');
const math = require('mathjs');
const { stripIndents } = require('common-tags');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('units')
		.setDescription('Converts a number to a different unit.')
		.addNumberOption(option =>
			option
				.setName('number')
				.setDescription('The number to convert')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('from')
				.setDescription('The unit to convert from')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('to')
				.setDescription('The unit to convert to')
				.setRequired(true)),
	async execute(interaction) {
		try {
			const number = interaction.options.getNumber('number');
			const from = interaction.options.getString('from');
			const to = interaction.options.getString('to');
			const value = math.unit(number, from).toNumber(to);
			await interaction.reply(
				`${formatNumber(number)} ${from} is ${formatNumber(
					value,
				)} ${to}.`,
			);
		} catch {
			await interaction.reply(stripIndents`
            Either an invalid unit type was provided or the unit types do not match.
            For a list of units, see <https://mathjs.org/docs/datatypes/units.html#reference>.
        `);
		}
	},
};
