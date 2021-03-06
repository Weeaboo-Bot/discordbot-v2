const { error, success, messageLog } = require('../utils/ChalkConfig');
module.exports = {
	name: 'messageDelete',
	description: 'the messageDelete event',
	once: false,
	async execute(message) {
	// Ignore direct messages
		if (!message.guild) return;
		const fetchedLogs = await message.guild.fetchAuditLogs({
			limit: 1,
			type: 'MESSAGE_DELETE',
		});
		// Since there's only 1 audit log entry in this collection, grab the first one
		const deletionLog = fetchedLogs.entries.first();

		// Perform a coherence check to make sure that there's *something*
		if (!deletionLog) return messageLog(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

		// Now grab the user object of the person who deleted the message
		// Also grab the target of this action to double-check things
		const { executor, target } = deletionLog;

		// Update the output with a bit more information
		// Also run a check to make sure that the log returned was for the same author's message
		if (target.id === message.author.id) {
			messageLog(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
		} else {
			error(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
		}
	},
};