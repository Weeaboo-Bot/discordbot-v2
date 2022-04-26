const { SlashCommandBuilder } = require('@discordjs/builders');
const { letterTrans, wordTrans } = require('custom-translate');
const emojiDict = require('../../assets/json/emojify.json');
const dvorakDict = require('../../assets/json/dvorak.json');
const cursiveDict = require('../../assets/json/cursive.json');
const bronyDict = require('../../assets/json/brony-speak.json');
const brailleDict = require('../../assets/json/braille.json');
const fancyDict = require('../../assets/json/fancy.json');
const morseDict = require('../../assets/json/morse.json');
const pirateDict = require('../../assets/json/pirate.json');
const superScriptDict = require('../../assets/json/superscript.json');
const tebahplaDict = require('../../assets/json/tebahpla.json');
const temmieDict = require('../../assets/json/temmie.json');
const upsideDownDict = require('../../assets/json/upside-down.json');
const zalgoDict = require('../../assets/json/zalgo.json');
// TODO clean up these imports


// Various string encoding and decoding.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('string-convert')
		.setDescription('Encodes or decodes a string to or from emoji.')
		.addSubcommandGroup(subcommandGroup =>
			subcommandGroup
				.setName('encode')
				.setDescription('Encodes a string.')
				.addSubcommand(subcommand =>
					subcommand
						.setName('emoji')
						.setDescription('Encodes a string to emoji.')
						.addStringOption(option =>
							option
								.setName('input')
								.setDescription('The text to encode.')
								.setRequired(true)))
				.addSubcommand(subcommand =>
					subcommand
						.setName('dvorak')
						.setDescription('Encodes a string to dvorak.')
						.addStringOption(option =>
							option
								.setName('input')
								.setDescription('The text to encode.')
								.setRequired(true)))
				.addSubcommand(subcommand =>
					subcommand
						.setName('cursive')
						.setDescription('Encodes a string to cursive.')
						.addStringOption(option =>
							option
								.setName('input')
								.setDescription('The text to encode.')
								.setRequired(true)))
				.addSubcommand(subcommand =>
					subcommand
						.setName('brony')
						.setDescription('Encodes a string to brony speak.')
						.addStringOption(option =>
							option
								.setName('input')
								.setDescription('The text to encode.')
								.setRequired(true)))
				.addSubcommand(subcommand =>
					subcommand
						.setName('braille')
						.setDescription('Encodes a string to braille.')
						.addStringOption(option =>
							option
								.setName('input')
								.setDescription('The text to encode.')
								.setRequired(true)))
				.addSubcommand(subcommand =>
					subcommand
						.setName('fancy')
						.setDescription('Encodes a string to fancy.')
						.addStringOption(option =>
							option
								.setName('input')
								.setDescription('The text to encode.')
								.setRequired(true)))
				.addSubcommand(subcommand =>
					subcommand
						.setName('morse')
						.setDescription('Encodes a string to morse.')
						.addStringOption(option =>
							option
								.setName('input')
								.setDescription('The text to encode.')
								.setRequired(true)))
				.addSubcommand(subcommand =>
					subcommand
						.setName('pirate')
						.setDescription('Encodes a string to pirate speak.')
						.addStringOption(option =>
							option
								.setName('input')
								.setDescription('The text to encode.')
								.setRequired(true)))
				.addSubcommand(subcommand =>
					subcommand
						.setName('superscript')
						.setDescription('Encodes a string to superscript.')
						.addStringOption(option =>
							option
								.setName('input')
								.setDescription('The text to encode.')
								.setRequired(true)))
				.addSubcommand(subcommand =>
					subcommand
						.setName('tebahpla')
						.setDescription('Encodes a string to tebahpla.')
						.addStringOption(option =>
							option
								.setName('input')
								.setDescription('The text to encode.')
								.setRequired(true)))
				.addSubcommand(subcommand =>
					subcommand
						.setName('temmie')
						.setDescription('Encodes a string to temmie speak.')
						.addStringOption(option =>
							option
								.setName('input')
								.setDescription('The text to encode.')
								.setRequired(true)))
				.addSubcommand(subcommand =>
					subcommand
						.setName('upside-down')
						.setDescription('Encodes a string to upside-down.')
						.addStringOption(option =>
							option
								.setName('input')
								.setDescription('The text to encode.')
								.setRequired(true)))
				.addSubcommand(subcommand =>
					subcommand
						.setName('zalgo')
						.setDescription('Encodes a string to zalgo.')
						.addStringOption(option =>
							option
								.setName('input')
								.setDescription('The text to encode.')
								.setRequired(true))),
		)
		.addSubcommandGroup(subcommandGroup =>
			subcommandGroup
				.setName('decode')
				.setDescription('Decodes a string.')
				.addSubcommand(subcommand =>
					subcommand
						.setName('decode')
						.setDescription('Decodes a string.')
						.addStringOption(option =>
							option
								.setName('input')
								.setDescription('The text to decode.')
								.setRequired(true))),
		),
	async execute(interaction) {
		const input = interaction.getStringOption('input');
		const output = await this.decode(input);
		interaction.setOutput(output);
	},
	async decode(input) {
		return input;
	},
};
