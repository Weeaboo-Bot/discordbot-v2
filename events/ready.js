module.exports = {
	name: 'ready',
	description: 'the ready event',
	once: true,
	execute(client) {
		console.log(`Hello! Logged in as ${client.user.tag}`);
	},
};