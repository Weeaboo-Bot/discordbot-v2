const { SlashCommandBuilder } = require('@discordjs/builders');
const { wordTrans } = require('custom-translate');
const dict = require('../../assets/json/brony-speak.json');

// Brony speak encoding and decoding.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('brony-speak')
		.setDescription('Encodes or decodes a string to or from brony speak.')
		.addStringOption(option =>
			option.setName('input')
				.setRequired(true)
				.setDescription('The string to encode or decode.')),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		await interaction.reply(wordTrans(input, dict));
	},
};
