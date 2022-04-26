const { SlashCommandBuilder } = require('@discordjs/builders');

// Mock text.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('mock-text')
		.setDescription('Mock text.')
		.addStringOption(option =>
			option
				.setName('input')
				.setDescription('The text to mock.')
				.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString('input');

		const letters = input.split('');
		for (
			let i = 0;
			i < letters.length;
			i += Math.floor(Math.random() * 4)
		) {
			letters[i] = letters[i].toUpperCase();
		}
		return interaction.reply(letters.join(''));
	},

};