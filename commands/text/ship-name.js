const { SlashCommandBuilder } = require('@discordjs/builders');

// Ship 2 names.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ship-name')
		.setDescription('Ship 2 names.')
		.addStringOption(option =>
			option
				.setName('start')
				.setDescription('The first name.')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('end')
				.setDescription('The second name.')
				.setRequired(true)),
	async execute(interaction) {
		const start = interaction.options.getString('name1');
		const end = interaction.options.getString('name2');
		await interaction.reply(`${start.slice(0, Math.floor(start.length / 2))}${end.slice(
			Math.floor(end.length / 2),
		)}`);
	},
};