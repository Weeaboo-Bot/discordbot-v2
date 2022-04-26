const { SlashCommandBuilder } = require('@discordjs/builders');

// LMGTFY encoding and decoding.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('lmgtfy')
		.setDescription('Encodes or decodes a string to or from lmgtfy.')
		.addStringOption(option =>
			option.setName('query')
				.setRequired(true)
				.setDescription('The query to search for.')),
	async execute(interaction) {
		const query = interaction.options.getString('query');
		await interaction.reply(`http://lmgtfy.com/?q=${query}`);
	},

};