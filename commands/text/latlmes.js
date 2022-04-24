const { SlashCommandBuilder } = require('@discordjs/builders');

// Latlmes encoding and decoding.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('latlmes')
		.setDescription('Encodes or decodes a string to or from latlmes.')
		.addStringOption(option =>
			option.setName('section')
				.setRequired(true)
				.setDescription('The section to search.'))
		.addStringOption(option =>
			option.setName('query')
				.setRequired(true)
				.setDescription('The query to search for.')),
	async execute(interaction) {
		const section = interaction.options.getString('section');
		const query = interaction.options.getString('query');
		await interaction.reply(`http://www.latlmes.com/${section}/${query}-1`);
	},
};