const { error, success } = require('../utils/ChalkConfig');
module.exports = {
	name: 'interactionCreate',
	description: 'the interactionCreate event',
	once: true,
	async execute(interaction) {
		if (!interaction.isCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			success(`${interaction.user.tag} triggered [${interaction.commandName}] in #${interaction.channel.name}`);
			await command.execute(interaction);
		} catch (err) {
			error(err);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};