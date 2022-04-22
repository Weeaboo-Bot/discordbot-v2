const { MessageEmbed } = require('discord.js');
const { cryP } = require('../../assets/json/actions.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cry')
		.setDescription('UWAA~'),
	async execute(interaction) {
		const embed = new MessageEmbed()
			.setColor('#FBCFCF')
			.setTitle('UWAA~')
			.setImage(cryP[Math.round(Math.random() * (cryP.length - 1))]);
		await interaction.reply({ content: `${interaction.user.username} has started crying!`, emdes:[embed] });
	},
};