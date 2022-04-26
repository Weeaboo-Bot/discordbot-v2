const { SlashCommandBuilder } = require('@discordjs/builders');
const { shuffle } = require('../../utils/Utils');

// Shuffle the text.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle-text')
		.setDescription('Shuffles text.')
		.addStringOption(option =>
			option
				.setName('input')
				.setDescription('The text to shuffle.')
				.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		await interaction.reply(shuffle(input.split('')).join(''));
	},
};