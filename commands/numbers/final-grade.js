const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	above100,
	above92,
	above88,
	above80,
	below80,
} = require('../../assets/json/final-grade');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('final-grade')
		.setDescription('Gives you your final grade')
		.addIntegerOption(option =>
			option.setName('grade')
				.setRequired(true)
				.setDescription('The grade you got.'),
		)
		.addIntegerOption(option =>
			option.setName('weight')
				.setRequired(true)
				.setDescription('The weight of the grade.'),
		)
		.addIntegerOption(option =>
			option.setName('final')
				.setRequired(true)
				.setDescription('The final grade.')),
	async execute(interaction) {
		const grade = interaction.options.getInteger('grade');
		const weight = interaction.options.getInteger('weight');
		const final = interaction.options.getInteger('final');
		const percentage = (grade * (weight / 100)) + (final * (100 - weight) / 100);
		if (percentage > 100) {
			await interaction.reply(above100);
		} else if (percentage > 92) {
			await interaction.reply(above92);
		} else if (percentage > 88) {
			await interaction.reply(above88);
		} else if (percentage > 80) {
			await interaction.reply(above80);
		} else {
			await interaction.reply(below80);
		}
	},
};