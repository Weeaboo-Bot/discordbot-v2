const { SlashCommandBuilder, codeBlock } = require('@discordjs/builders');
const { data } = require('cheerio/lib/api/attributes');
const WeabooEmbed = require('../../structures/client/WeabooEmbed');
const { shorten, truncate } = require('../../utils/Utils');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('message-info')
		.setDescription('Get information about a message.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('info')
				.setDescription('Get information about a message.')
				.addStringOption(option =>
					option
						.setName('message')
						.setDescription('The message ID to get information about.')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('edits')
				.setDescription('Get information about a message\'s edits.')
				.addStringOption(option =>
					option
						.setName('message')
						.setDescription('The message ID to get information about.')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('source')
				.setDescription('Get the source code of a message.')
				.addStringOption(option =>
					option
						.setName('message')
						.setDescription('The message ID to get information about.')
						.setRequired(true))),
	async execute(interaction) {
		const messageID = interaction.options.getString('message');
		const messageList = await interaction.channel.messages.fetch({ cache: true });

		// await interaction.channel.messages.fetch();
		const message = messageList.get(messageID);

		if (!message) {
			return interaction.reply('Message not found. Note: I can only load messages from this channel.');
		}

		switch (interaction.options._subcommand) {
		case 'info': {
			const hasImage = message.attachments.size && message.attachments.first().width;

			const infoEmbed = new WeabooEmbed()
				.setColor(message.member ? message.member.displayHexColor : '0x00AE86')
				.setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true }))
				.setImage(hasImage ? message.attachments.first().url : null)
				.setAuthor({ name : message.author.tag, iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true }) })
				.setDescription(message.content)
				.setTimestamp(message.createdAt.toLocaleString())
				.setFooter({ text: 'Message ID: ' + message.id, iconURL: message.author.displayAvatarURL({ format: 'png', dynamic: true }) })
				.addField('❯ Jump', message.url);
			return interaction.reply({ embeds: [infoEmbed] });
		}
		case 'edits': {

			const nestedFields = [];

			for (let i = 0; i < message.edits.length; i++) {
				nestedFields.push(
					`❯\u2000**${
						i === message.edits.length - 1
							? 'Original'
							: i === 0
								? 'Latest'
								: `Edit #${message.edits.length - i - 1}`
					}:**\n` +
                        `•\u2000${
                        	message.edits[i].content.length > 0
                        		? truncate(message.edits[i].content, 1024)
                        		: '`N/A`'
                        }\n`,
				);
			}

			const editEmbed = new WeabooEmbed()
				.setAuthor({ name: `${message.author.tag} @ ${message.createdAt.toLocaleString()}`, iconURL: message.author.displayAvatarURL() })
				.setFooter({ text: `Latest edit: ${message.editedAt.toLocaleString()}` })
				.setDescription(nestedFields);
			return interaction.reply({ embeds: [editEmbed] });
		}
		case 'source': {
			if (!message.content) {
				await interaction.reply('This message has no content.');
			}

			return interaction.reply(`The source code of this message is: ${codeBlock(shorten(message.content, 1000))}`);
		}
		default:
			break;
		}
	},
};
