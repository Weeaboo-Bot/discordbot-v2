const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('tax-rate')
		.setDescription('Determines your tax rate.')
		.addIntegerOption(option =>
			option.setName('income')
				.setRequired(true)
				.setDescription('The amount of income you have.')),
	async execute(interaction) {
		const income = interaction.options.getInteger('income');
		const taxRate = Math.round((income * 0.25) / 12);
		await interaction.reply(`Your tax rate is a **${taxRate}%**.`);
	},
};