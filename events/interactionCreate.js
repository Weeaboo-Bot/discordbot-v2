module.exports = {
	name: 'interactionCreate',
	description: 'the interaction create event',
	execute(interaction) {
		console.log(`Interaction created: ${interaction.id}`);
	},
};