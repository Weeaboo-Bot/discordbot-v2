const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders');
const { hash } = require('../../utils/Utils');
// Hash text.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('hash')
		.setDescription('Hashes text.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('md5')
				.setDescription('Hashes text using MD5.')
				.addStringOption(option =>
					option
						.setName('input')
						.setDescription('The text to convert.')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('sha1')
				.setDescription('Hashes text using SHA1.')
				.addStringOption(option =>
					option
						.setName('input')
						.setDescription('The text to convert.')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('sha256')
				.setDescription('Hashes text using SHA256.')
				.addStringOption(option =>
					option
						.setName('input')
						.setDescription('The text to convert.')
						.setRequired(true))),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		const hashType = interaction.options.data[0].name;
		await interaction.reply(inlineCode(hash(input, hashType)));
	},


};
