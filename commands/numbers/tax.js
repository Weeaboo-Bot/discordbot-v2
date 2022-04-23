const { SlashCommandBuilder } = require('@discordjs/builders');
const { formatNumber } = require('../../utils/Utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tax')
		.setDescription('Determines the total cost of a purchase after tax.')
		.addIntegerOption(option =>
			option.setName('price')
				.setDescription('The price of the item')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('tax')
				.setDescription('The tax rate')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('tip')
				.setDescription('The tip percentage')
				.setRequired(false)),
	async execute(interaction) {
		const price = interaction.options.getInteger('price');
		const tax = interaction.options.getInteger('tax');
		const tip = interaction.options.getInteger('tip');
		const total = price + (price * tax / 100) + (price * tip / 100);
		await interaction.reply(`The total cost is ${formatNumber(total)}`);
	},
};
