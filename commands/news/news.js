const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { error } = require('../../utils/ChalkConfig');
const NEWS_KEY = require('../../config').api.NEWS_KEY;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('news')
		.setDescription('Gets the latest news from the news channel.')
		.addStringOption(option => option
			.setName('topic')
			.setDescription('The topic to search for.')
			.setRequired(false)),
	async execute(interaction) {
		const topic = interaction.options.getString('topic');
		// powered by NewsAPI.org
		try {
			const response = await fetch(
				`https://newsapi.org/v2/everything?q=${topic}&sortBy=publishedAt&pageSize=5&source=associated-press&apiKey=${NEWS_KEY}`,
			);
			const json = await response.json();
			const articleArr = json.articles;
			await this.processArray(articleArr, interaction);
		} catch (e) {
			await interaction.reply('Something failed along the way');
			error(e);
		}
	},
	async processArticle(article) {
		const embed = new MessageEmbed()
			.setColor('#FF4F00')
			.setTitle(article.title)
			.setURL(article.url)
			.setAuthor(article.author)
			.setDescription(article.description)
			.setThumbnail(article.urlToImage)
			.setTimestamp(article.publishedAt)
			.setFooter('powered by NewsAPI.org');
		return embed;
	},
	async processArray(array, interaction) {
		for (const article of array) {
			const msg = await this.processArticle(article);
			await interaction.channel.send({ embeds: [msg] });
		}
	},

};