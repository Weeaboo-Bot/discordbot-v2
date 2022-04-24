const { SlashCommandBuilder } = require('@discordjs/builders');
const { formatNumber } = require('../../utils/Utils');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('gravity')
		.setDescription('Calculates the gravity of a planet.')
		.addNumberOption(option =>
			option.setName('mass')
				.setRequired(true)
				.setDescription('The mass of the object.'),
		)
		.addNumberOption(option =>
			option.setName('radius')
				.setRequired(true)
				.setDescription('The radius of the object.')),
	async execute(interaction) {
		const mass = interaction.options.getNumber('mass');
		const radius = interaction.options.getNumber('radius');
		const gravity = (mass * 6.67408) / (radius * radius);
		await interaction.reply(`The gravity of the object is ${formatNumber(gravity)} m/s².`);
	},
};
