const { SlashCommandBuilder } = require('@discordjs/builders');
const { letterTrans } = require('custom-translate');
const dict = require('../../assets/json/braille.json');

// Braille encoding and decoding.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('braille')
		.setDescription('Encodes or decodes a string to or from braille.')
		.addStringOption(option =>
			option.setName('input')
				.setRequired(true)
				.setDescription('The string to encode or decode.')),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		await interaction.reply(letterTrans(input, dict));
	},
};
