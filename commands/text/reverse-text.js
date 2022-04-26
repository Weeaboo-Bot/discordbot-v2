const { SlashCommandBuilder } = require('@discordjs/builders');

// Reverse the text.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('reverse-text')
        .setDescription('Reverses text.')
        .addStringOption(option =>
            option
                .setName('input')
                .setDescription('The text to reverse.')
                .setRequired(true)),
    async execute(interaction) {
        const input = interaction.options.getString('input');
        await interaction.reply(input.split('').reverse().join(''));
    },
};