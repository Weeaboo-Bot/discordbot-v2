const { SlashCommandBuilder } = require('@discordjs/builders');

// Convert text to snake speak.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('snake-speak')
		.setDescription('Converts text to snake speak.')
		.addStringOption(option =>
			option
				.setName('input')
				.setDescription('The text to convert.')
				.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		await interaction.reply(input.replaceAll('s', 'sssss').replaceAll('S', 'SSSSS'));
	},


};
