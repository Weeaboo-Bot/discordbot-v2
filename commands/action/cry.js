const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cry')
		.setDescription('UWAA~'),
	async execute(interaction) {
		return interaction.reply(`:'(`);
	},
};