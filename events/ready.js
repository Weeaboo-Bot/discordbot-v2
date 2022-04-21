module.exports = {
	name: 'ready',
	description: 'the ready event',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};