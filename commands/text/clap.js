const { SlashCommandBuilder } = require('@discordjs/builders');

// Clap encoding and decoding.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clap')
		.setDescription('Encodes or decodes a string to or from clap.')
		.addStringOption(option =>
			option.setName('input')
				.setRequired(true)
				.setDescription('The string to encode or decode.')),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		await interaction.reply(input.replaceAll(' ', ' 👏 '));
	},
};
