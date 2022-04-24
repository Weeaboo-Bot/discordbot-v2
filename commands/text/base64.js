const { SlashCommandBuilder } = require('@discordjs/builders');
const { list, base64 } = require('../../utils/Utils');

// Base 64 encoding and decoding.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('base64')
		.setDescription('Encodes or decodes a string to or from base64.')
		.addStringOption(option =>
			option.setName('mode')
				.setRequired(true)
				.setDescription('The mode to use. Valid modes are: `encode`, `decode`.')
				.addChoice('encode', 'Encodes a string to base64.')
				.addChoice('decode', 'Decodes a base64 string.'))
		.addStringOption(option =>
			option.setName('string')
				.setRequired(true)
				.setDescription('The string to encode or decode.')),
	async execute(interaction) {
		const mode = interaction.options.getString('mode');
		const string = interaction.options.getString('string');
		const result = mode === 'encode' ? base64.encode(string) : base64.decode(string);
		await interaction.reply(`${list(result)}`);
	},
};
