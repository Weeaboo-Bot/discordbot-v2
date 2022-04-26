const { SlashCommandBuilder } = require('@discordjs/builders');
const faces = ['(・`ω´・)', ';;w;;', 'owo', 'UwU', '>w<', '^w^'];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('owo-speak')
		.setDescription('Converts text to OwO speak.')
		.addStringOption(option =>
			option
				.setName('input')
				.setDescription('The text to convert.')
				.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		return interaction.reply(this.owo(input));
	},
	/**
     * Converts text to OwO speak.
     * @param {*} text The text to convert.
     * @returns {string} The converted text.
     */
	owo(text) {
		return text
			.replace(/(?:r|l)/g, 'w')
			.replace(/(?:R|L)/g, 'W')
			.replace(/n([aeiou])/g, 'ny$1')
			.replace(/N([aeiou])/g, 'Ny$1')
			.replace(/N([AEIOU])/g, 'NY$1')
			.replace(/ove/g, 'uv')
			.replace(
				/!+/g,
				` ${faces[Math.floor(Math.random() * faces.length)]} `,
			)
			.trim();
	},
};