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
		.addSubcommandGroup({
			name: 'encode',
			description: 'Encodes a string.',
			subcommands: [
				{
					name: 'emoji',
					description: 'Encodes a string to emoji.',
					usage: '<string>',
					example: 'hello',
					execute: async (interaction) => {
						const input = interaction.options.getString('input');
						const encoded = letterTrans(input, emojiDict);
						await interaction.reply(encoded);
					},
				},
				{
					name: 'dvorak',
					description: 'Encodes a string to dvorak.',
					usage: '<string>',
					example: 'hello',
					execute: async (message, args) => {
						const string = args.join(' ');
						const encoded = letterTrans(string, dvorakDict);
						await message.channel.send(encoded);
					},
				},
				{
					name: 'cursive',
					description: 'Encodes a string to cursive.',
					usage: '<string>',
					example: 'hello',
					execute: async (message, args) => {
						const string = args.join(' ');
						const encoded = letterTrans(string, cursiveDict);
						await message.channel.send(encoded);
					},
				},
				{
					name: 'brony',
					description: 'Encodes a string to brony speak.',
					usage: '<string>',
					example: 'hello',
					execute: async (message, args) => {
						const string = args.join(' ');
						const encoded = wordTrans(string, bronyDict);
						await message.channel.send(encoded);
					},
				},
				{
					name: 'braille',
					description: 'Encodes a string to braille.',
					usage: '<string>',
					example: 'hello',
					execute: async (message, args) => {
						const string = args.join(' ');
						const encoded = letterTrans(string, brailleDict);
						await message.channel.send(encoded);
					},
				},
				{
					name: 'fancy',
					description: 'Encodes a string to fancy.',
					usage: '<string>',
					example: 'hello',
					execute: async (message, args) => {
						const string = args.join(' ');
						const encoded = letterTrans(string, fancyDict);
						await message.channel.send(encoded);
					},
				},
				{
					name: 'morse',
					description: 'Encodes a string to morse.',
					usage: '<string>',
					example: 'hello',
					execute: async (message, args) => {
						const string = args.join(' ');
						const encoded = wordTrans(string, morseDict);
						await message.channel.send(encoded);
					},
				},
				{
					name: 'pirate',
					description: 'Encodes a string to pirate speak.',
					usage: '<string>',
					example: 'hello',
					execute: async (message, args) => {
						const string = args.join(' ');
						const encoded = wordTrans(string, pirateDict);
						await message.channel.send(encoded);
					},
				},
				{
					name: 'superscript',
					description: 'Encodes a string to superscript.',
					usage: '<string>',
					example: 'hello',
					execute: async (message, args) => {
						const string = args.join(' ');
						const encoded = letterTrans(string, superScriptDict);
						await message.channel.send(encoded);
					},
				},
				{
					name: 'tebahpla',
					description: 'Encodes a string to tebahpla.',
					usage: '<string>',
					example: 'hello',
					execute: async (message, args) => {
						const string = args.join(' ');
						const encoded = letterTrans(string, tebahplaDict);
						await message.channel.send(encoded);
					},
				},
				{
					name: 'temmie',
					description: 'Encodes a string to temmie speak.',
					usage: '<string>',
					example: 'hello',
					execute: async (message, args) => {
						const string = args.join(' ');
						const encoded = wordTrans(string, temmieDict);
						await message.channel.send(encoded);
					},
				},
				{
					name: 'zalgo',
					description: 'Encodes a string to zalgo.',
					usage: '<string>',
					example: 'hello',
					execute: async (message, args) => {
						const string = args.join(' ');
						const encoded = letterTrans(string, zalgoDict);
						await message.channel.send(encoded);
					},
				},
				{
					name: 'upsidedown',
					description: 'Encodes a string to upside down.',
					usage: '<string>',
					example: 'hello',
					execute: async (message, args) => {
						const string = args.join(' ');
						const encoded = letterTrans(string, upsideDownDict);
						await message.channel.send(encoded);
					},
				},
			],
		}),
};
