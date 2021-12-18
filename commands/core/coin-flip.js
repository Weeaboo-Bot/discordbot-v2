const { SlashCommandBuilder } = require('@discordjs/builders');
const rand = ['HEADS!', 'TAILS!'];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coin-flip')
		.setDescription('Replies with Heads or Tails!'),
	async execute(interaction) {

		await interaction.reply(rand[Math.floor(Math.random() * rand.length)]);
	},
};