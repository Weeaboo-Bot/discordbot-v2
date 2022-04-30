const { SlashCommandBuilder } = require('@discordjs/builders');
const WeabooEmbed = require('../../structures/client/WeabooEmbed');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('server-info')
		.setDescription('Get information about the server.'),
	async execute(interaction) {
		const server = interaction.guild;
		const serverInfoEmbed = new WeabooEmbed()
			.setTitle(`Server Information for ${server.name}`)
			.addField('Server Info', '----')
			.addFields(
				{ name: '❯ Server ID', value: server.id, inline: true },
				{ name: '❯ Server Name', value: server.name, inline: true },
				{ name: '❯ Server Creation Date', value: server.createdAt.toLocaleString(), inline: true },
				{ name: '❯ Server Owner', value: `<@${server.ownerId}>`, inline: true },
				{ name: '❯ Server Verification Level', value: server.verificationLevel, inline: true },
				{ name: '❯ Server AFK Channel', value: server.afkChannel ? server.afkChannel.name : 'None', inline: true },
				{ name: '❯ Server AFK Timeout', value: server.afkTimeout.toString(), inline: true },
				{ name: '❯ Server Icon URL', value: server.iconURL(), inline: true },
				{ name: '❯ Server Member Count', value: server.memberCount.toString(), inline: true },
				{ name: '❯ Server Roles', value: '----', inline: true },
			);

		for (const role of server.roles.cache) {
			serverInfoEmbed.addField(`❯ ${role[1].name}`, `${role[1].id}`, true);
		}

		interaction.reply({ embeds: [serverInfoEmbed] });
	},
};