const { SlashCommandBuilder } = require('@discordjs/builders');
const { shuffle, firstUpperCase } = require('../../utils/Utils');
const forced = require('../../assets/json/nobody-name.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nobody-name')
		.setDescription('Converts a name into the Organization XIII style.')
		.addStringOption(option =>
			option
				.setName('input')
				.setDescription('The name to convert.')
				.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		if (forced[input.toLowerCase()]) {
			return interaction.reply(forced[input.toLowerCase()]);
		}
		const letters = input.split('');
		letters.push('x');
		const shuffled = shuffle(letters);
		return interaction.reply(firstUpperCase(shuffled.join('')));

	},
};