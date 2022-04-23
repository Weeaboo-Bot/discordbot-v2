const { SlashCommandBuilder } = require('@discordjs/builders');
const { formatNumber, isPrime } = require('../../utils/Utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prime')
		.setDescription('Determines if a number is prime.')
		.addIntegerOption(option =>
			option.setName('number')
				.setRequired(true)
				.setDescription('The number to check.')),
	async execute(interaction) {
		const number = interaction.options.getInteger('number');
		await interaction.reply(
			`${formatNumber(number)} is${
				isPrime(number) ? '' : ' not'
			} a prime number.`,
		);
	},

};