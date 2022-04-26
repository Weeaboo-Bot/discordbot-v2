const { SlashCommandBuilder, spoiler } = require('@discordjs/builders');

// Spoiler text.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('spoiler')
		.setDescription('Makes text appear as a spoiler.')
		.addStringOption(option =>
			option
				.setName('input')
				.setDescription('The text to convert.')
				.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		await interaction.reply(spoiler(input));
	},
};