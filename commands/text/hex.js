const { SlashCommandBuilder } = require('@discordjs/builders');

// Hex encoding and decoding.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('hex')
		.setDescription('Encodes or decodes a string to or from hex.')
		.addStringOption(option =>
			option.setName('input')
				.setRequired(true)
				.setDescription('The string to encode or decode.')),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		await interaction.reply(Buffer.from(input).toString('hex'));
	},
};
