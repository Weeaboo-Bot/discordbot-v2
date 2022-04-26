const { SlashCommandBuilder } = require('@discordjs/builders');

// Create text file
module.exports = {
	data: new SlashCommandBuilder()
		.setName('text-file')
		.setDescription('Creates a text file.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('The name of the file.')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('content')
				.setDescription('The content of the file.')
				.setRequired(true)),
	async execute(interaction) {
		const name = interaction.options.getString('name');
		const content = interaction.options.getString('content');


		interaction.channel.send({
			files: [{ attachment: Buffer.from(content), name: `${name}.txt` }],
		});
	},
};
