const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

// Embed text.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed-text')
		.setDescription('Embed text.')
		.addStringOption(option =>
			option
				.setName('input')
				.setDescription('The text to embed.')
				.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		const embed = new MessageEmbed()
			.setTitle('Embed Text')
			.setDescription(input)
			.setColor(0x00AE86);
		await interaction.reply(embed);
	},
};