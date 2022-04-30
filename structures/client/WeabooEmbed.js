const { MessageEmbed } = require('discord.js');
const { BOT_IMG_LINK, BOT_IMG_TOKEN } = require('../../config').discord;

// Custom Weaboo Embed
module.exports = class WeabooEmbed extends MessageEmbed {
	constructor() {
		super();
		this.setColor('#0d541a');
		this.setTitle('Weaboo Embed');
		this.setFooter({ text: 'Weaboo Discord Bot', iconURL: `${BOT_IMG_LINK}?alt=media&token=${BOT_IMG_TOKEN}` });
		this.setTimestamp();
	}
};