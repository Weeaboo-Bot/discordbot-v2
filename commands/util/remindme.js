const moment = require('moment');
const sherlock = require('sherlockjs');
const { SlashCommandBuilder } = require('@discordjs/builders');


// Remind me later.
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remindme')
		.setDescription('Reminds you to do something in the future.')
		.addStringOption(option =>
			option.setName('time')
				.setRequired(true)
				.setDescription('The time to remind you to do something.'))
		.addStringOption(option =>
			option.setName('message')
				.setRequired(true)
				.setDescription('The message to remind you to do something.')),
	async execute(interaction) {
		const time = interaction.options.getString('time');
		const message = interaction.options.getString('message');

		const timer = time.startDate.getTime() - Date.now();

		const preRemind = await interaction.reply(
			`Got it! I will remind you in **${moment()
				.add(timer, 'ms')
				.fromNow(true)}**! \`(${timer}ms)\``,
		);
		const remindMessage = await new Promise((resolve) => {
			setTimeout(
				() => resolve(interaction.author.send(`⏰ | ${message}!`)),
				timer,
			);
		});

		return [preRemind, remindMessage];

	},
};

