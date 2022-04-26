const { SlashCommandBuilder, hyperlink } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { error } = require('../../utils/ChalkConfig');
const BITLY_KEY = require('../../config').api.BITLY_KEY;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('url-process')
		.setDescription('Processes a URL.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('encode')
				.setDescription('Encodes a URL.')
				.addStringOption(option =>
					option
						.setName('url')
						.setDescription('The URL to encode.')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('decode')
				.setDescription('Decodes a URL.')
				.addStringOption(option =>
					option
						.setName('url')
						.setDescription('The URL to decode.')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('shorten')
				.setDescription('Shortens a URL.')
				.addStringOption(option =>
					option
						.setName('url')
						.setDescription('The URL to shorten.')
						.setRequired(true))),
	async execute(interaction) {
		const url = interaction.options.getString('url');
		switch (interaction.options.data[0].name) {
		case 'encode':
			await interaction.reply(encodeURIComponent(url));
			break;
		case 'decode':
			await interaction.reply(decodeURIComponent(url));
			break;
		case 'shorten':
			try {
				const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${BITLY_KEY}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ 'long_url': `${url}` }),
				});
				const data = await response.json();
				await interaction.reply(hyperlink(data.link));
			} catch (err) {
				error(err);
				await interaction.reply('An error occurred while shortening the URL.');
			}
			break;
		default:
			break;
		}
	},
};