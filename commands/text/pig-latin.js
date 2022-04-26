const { SlashCommandBuilder } = require('@discordjs/builders');

// Convert text to pig latin.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('pig-latin')
		.setDescription('Converts text to pig latin.')
		.addStringOption(option =>
			option
				.setName('input')
				.setDescription('The text to convert.')
				.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		await interaction.reply(this.pigLatin(input));
	},
	pigLatin(text) {
		return text.replace(/\w+/g, this.pigLatinWord).toLowerCase();
	},
	pigLatinWord(word) {
		return `${word.slice(1)}${word.charAt(0)}ay`;
	},
};