const { SlashCommandBuilder } = require('@discordjs/builders');

// Binary encoding and decoding.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('binary')
		.setDescription('Encodes or decodes a string to or from binary.')
		.addStringOption(option =>
			option.setName('input')
				.setRequired(true)
				.setDescription('The string to encode or decode.')),
	async execute(interaction) {
		const input = interaction.options.getString('input');

		const binary = (text) => {
			return text
				.split('')
				.map((str) => {
					const converted = str.charCodeAt(0).toString(2);
					return converted.padStart(8, '0');
				})
				.join(' ');
		};

		await interaction.reply(`${binary(input)}`);
	},
};

