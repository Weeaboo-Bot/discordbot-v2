const { SlashCommandBuilder } = require('@discordjs/builders');

// Repeat the text.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('repeat-text')
		.setDescription('Repeats text.')
		.addNumberOption(option =>
			option
				.setName('amount')
				.setDescription('The amount of times to repeat the text.')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('input')
				.setDescription('The text to repeat.')
				.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		const amount = interaction.options.getNumber('amount');
		await interaction.reply(input.repeat(amount).substr(0, 2000));
	},
};