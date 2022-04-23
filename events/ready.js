const { success } = require('../utils/ChalkConfig');

module.exports = {
	name: 'ready',
	description: 'the ready event',
	once: true,
	execute(client) {
		success(`Hello! Logged in as ${client.user.tag}`);
	},
};