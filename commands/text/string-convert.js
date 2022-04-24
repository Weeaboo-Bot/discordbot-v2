const { SlashCommandBuilder } = require('@discordjs/builders');
const { letterTrans, wordTrans } = require('custom-translate');
const emojiDict = require('../../assets/json/emojify.json');
const dvorakDict = require('../../assets/json/dvorak.json');
const cursiveDict = require('../../assets/json/cursive.json');
const bronyDict = require('../../assets/json/brony-speak.json');
const brailleDict = require('../../assets/json/braille.json');


// Various string encoding and decoding.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('string-convert')
		.setDescription('Encodes or decodes a string to or from emoji.')
		.addSubcommand(subcommand =>
			subcommand.setName('emoji')
				.setDescription('Encodes or decodes a string to or from emoji.')
				.addStringOption(option =>
					option.setName('input')
						.setRequired(true)
						.setDescription('The string to encode or decode.')))
		.addSubcommand(subcommand =>
			subcommand.setName('dvorak')
				.setDescription('Encodes or decodes a string to or from dvorak.')
				.addStringOption(option =>
					option.setName('input')
						.setRequired(true)
						.setDescription('The string to encode or decode.')))
		.addSubcommand(subcommand =>
			subcommand.setName('cursive')
				.setDescription('Encodes or decodes a string to or from cursive.')
				.addStringOption(option =>
					option.setName('input')
						.setRequired(true)
						.setDescription('The string to encode or decode.')))
		.addSubcommand(subcommand =>
			subcommand.setName('brony')
				.setDescription('Encodes or decodes a string to or from brony.')
				.addStringOption(option =>
					option.setName('input')
						.setRequired(true)
						.setDescription('The string to encode or decode.')))
		.addSubcommand(subcommand =>
			subcommand.setName('braille')
				.setDescription('Encodes or decodes a string to or from braille.')
				.addStringOption(option =>
					option.setName('input')
						.setRequired(true)
						.setDescription('The string to encode or decode.'))),
	async execute(interaction) {
		const input = interaction.options.getString('input');
		const subcommand = interaction.subcommand;
		if (subcommand === 'emoji') {
			return interaction.reply(letterTrans(input, emojiDict));
		} else if (subcommand === 'dvorak') {
			return interaction.reply(letterTrans(input, dvorakDict));
		} else if (subcommand === 'cursive') {
			return interaction.reply(letterTrans(input, cursiveDict));
		} else if (subcommand === 'brony') {
			return interaction.reply(letterTrans(input, bronyDict));
		} else if (subcommand === 'braille') {
			return interaction.reply(letterTrans(input, brailleDict));
		} else {
			return interaction.reply(wordTrans(input, emojiDict));
		}
	},
};
