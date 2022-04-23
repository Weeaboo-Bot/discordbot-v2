const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('grade')
		.setDescription('Determines your grade on an assignment on an 100-point scale.')
		.addIntegerOption(option =>
			option.setName('earned')
				.setRequired(true)
				.setDescription('The amount of points you earned.'),
		)
		.addIntegerOption(option =>
			option.setName('total')
				.setRequired(true)
				.setDescription('The total amount of points possible.')),
	async execute(interaction) {
		const earned = interaction.options.getInteger('earned');
		const total = interaction.options.getInteger('total');
		const score = Math.round((earned / total) * 100);
		await interaction.reply(
			`Your score is a **${score}%**${
				score >= 70 ? '! Nice job!' : '... Too bad...'
			}`,
		);
	},
};
