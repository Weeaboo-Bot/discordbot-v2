const { SlashCommandBuilder, bold } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channel-info')
		.setDescription('Various Channel Information')
		.addSubcommand(subcommand =>
			subcommand
				.setName('info')
				.setDescription('Get information about a channel.')
				.addChannelOption(option =>
					option
						.setName('channel')
						.setDescription('The channel to get information about.')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('first-message')
				.setDescription('Get the first message in a channel.')
				.addChannelOption(option =>
					option
						.setName('channel')
						.setDescription('The channel to get information about.')
						.setRequired(true))),
	async execute(interaction) {
		const channel = interaction.options.getChannel('channel');
		const messageList = await channel.messages.fetch();

		switch (interaction.options._subcommand) {
		case 'info':{
			const channelInfoEmbed = new MessageEmbed()
				.setTitle(`Channel Information for #${channel.name}`)
				.setColor('#0d541a')
				.addField(bold('Channel Info'), '----')
				.addFields(
					{ name: '❯ Channel ID', value: channel.id, inline: true },
					{ name: '❯ Channel Type', value: channel.type, inline: true },
					{ name: '❯ Channel Topic', value: channel.topic, inline: true },
					{ name: '❯ NSFW', value: channel.nsfw ? 'Yes' : 'No', inline: true },
					{ name: '❯ Channel Creation Date', value: channel.createdAt.toLocaleString(), inline: true })
				.addField(bold('Last Message Info'), '----')
				.addFields(
					{ name: '❯ Channel Last Message', value: channel.lastMessage.content, inline: true },
					{ name: '❯ Channel Last Message Creation Date', value: channel.lastMessage.createdAt.toLocaleString(), inline: true },
					{ name: '❯ Channel Last Message ID', value: channel.lastMessage.id, inline: true },
					{ name: '❯ Channel Last Message Author', value: channel.lastMessage.author.tag, inline: true },
					{ name: '❯ Channel Last Message Author ID', value: channel.lastMessage.author.id, inline: true },
					{ name: '❯ Channel Last Message Author Avatar', value: channel.lastMessage.author.displayAvatarURL(), inline: true },
				);
			interaction.reply({ embeds: [channelInfoEmbed] });
			break;
		}
		case 'first-message': {
			const firstMessage = messageList.first();
			const firstMessageEmbed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle(`First Message in ${channel.name}`)
				.setDescription(`The first message in ${channel.name}`)
				.setAuthor({ name: firstMessage.author.tag, iconURL: firstMessage.author.displayAvatarURL() })
				.addFields(
					{ name: 'Content', value: firstMessage.content, inline: true },
					{ name: 'Timestamp', value: firstMessage.createdAt.toLocaleString(), inline: true },
				);
			interaction.reply({ embeds: [firstMessageEmbed] });
			break;
		}
		default:
			interaction.reply('No subcommand was specified.');
			break;
		}

	},
};
