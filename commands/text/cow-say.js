const { SlashCommandBuilder } = require('@discordjs/builders');
const request = require('node-fetch');

// Cow speak encoding and decoding.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('cow-say')
		.setDescription('Encodes or decodes a string to or from cow speak.')
		.addStringOption(option =>
			option.setName('input')
				.setRequired(true)
				.setDescription('The string to encode or decode.')),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		try {
			const { body } = await request
				.get('http://cowsay.morecode.org/say')
				.query({
					message: input,
					format: 'json',
				});
			return interaction.reply(body.cow);
		} catch (err) {
			return interaction.reply(
				`Oh no, an error occurred: \`${err.message}\`. Try again later!`,
			);
		}
	},
};
