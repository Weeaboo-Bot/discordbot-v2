const { SlashCommandBuilder } = require('@discordjs/builders');
const request = require('node-superfetch');
const { error } = require('../../utils/ChalkConfig');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('yoda')
		.setDescription('Converts text to Yoda speak.')
		.addStringOption(option =>
			option
				.setName('input')
				.setDescription('The text to convert.')
				.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		try {
			const { body } = await request
				.get('https://yoda-api.appspot.com/api/v1/yodish')
				.query({ text: input });
			if (!body.yodish) {
				return interaction.reply(
					'Empty, this message is. Try again later, you must.',
				);
			}
			return interaction.reply(body.yodish);
		} catch (err) {
			error(err);
			return interaction.reply(
				`Being a jerk again, Yoda is: \`${err.message}\`. Try again later, you must.`,
			);
		}

	},

};