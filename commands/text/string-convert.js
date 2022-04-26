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
				.setName('encode-string')
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
				.setName('decode-string')
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
		const input = interaction.options.getString('input');

		switch (interaction.options.data[0].options[0].name) {
		case 'braille':
			interaction.reply(letterTrans(input, brailleDict));
			break;
		case 'brony':
			interaction.reply(wordTrans(input, bronyDict));
			break;
		case 'cursive':
			interaction.reply(letterTrans(input, cursiveDict));
			break;
		case 'dvorak':
			interaction.reply(letterTrans(input, dvorakDict));
			break;
		case 'emoji':
			interaction.reply(letterTrans(input, emojiDict, ' '));
			break;
		case 'fancy':
			interaction.reply(letterTrans(input, fancyDict));
			break;
		case 'morse':
			interaction.reply(letterTrans(input, morseDict));
			break;
		case 'pirate':
			interaction.reply(wordTrans(input, pirateDict));
			break;
		case 'superscript':
			interaction.reply(letterTrans(input, superScriptDict));
			break;
		case 'tebahpla':
			interaction.reply(letterTrans(input, tebahplaDict));
			break;
		case 'temmie':
			interaction.reply(this.temmieSpeak(input));
			break;
		case 'upside-down':
			interaction.reply(letterTrans(input, upsideDownDict).split('').reverse().join(''));
			break;
		case 'zalgo':
			interaction.reply(this.zalgoSpeak(input));
			break;
		default:
			interaction.reply('Invalid option.');
			break;
		}

	},
	temmieSpeak(input) {
		return wordTrans(input, temmieDict)
			.replaceAll('ing', 'in')
			.replaceAll('ING', 'IN')
			.replaceAll('!', '!!!!111!1!')
			.replaceAll('\'', '');
	},
	zalgoSpeak(input) {
		let result = '';
		for (let i = 0; i < input.length; i++) {
			result += input[i];
			for (const chars of Object.values(zalgoDict)) {
				let count = Math.floor(Math.random() * 5);
				while (count--) {
					result += chars[Math.floor(Math.random() * chars.length)];
				}
			}
		}
		return result;
	},
};
