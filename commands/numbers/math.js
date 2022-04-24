const { SlashCommandBuilder } = require('@discordjs/builders');
const { formatNumber } = require('../../utils/Utils');
const { Parser } = require('expr-eval');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('math')
		.setDescription('Evaluates a math expression.')
		.addStringOption(option =>
			option.setName('expression')
				.setRequired(true)
				.setDescription('The expression to evaluate.')),
	async execute(interaction) {
		const expression = interaction.options.getString('expression');
		const result = Parser.evaluate(expression);
		await interaction.reply(`The result of the expression is ${formatNumber(result)}.`);
	},
};