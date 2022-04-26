// config.js
const dotenv = require('dotenv');
dotenv.config({ debug: true });

exports.discord = {
	DISCORD_TOKEN: process.env.DISCORD_TOKEN,
	DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
	DISCORD_PUBLIC_KEY: process.env.DISCORD_PUBLIC_KEY,
	DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID,
	MUSIC_CHANNEL_ID: process.env.MUSIC_CHANNEL_ID,
};

exports.api = {
	ALPHA_KEY: process.env.ALPHA_VANTAGE,
	BITLY_KEY: process.env.BITLY_KEY,
	BITLY_CLIENT_ID: process.env.BITLY_CLIENT_ID,
	BITLY_CLIENT_SECRET: process.env.BITLY_CLIENT_SECRET,
	GENIUS_CLIENT_ID: process.env.GENIUS_CLIENT_ID,
	GENIUS_CLIENT_SECRET: process.env.GENIUS_CLIENT_SECRET,
	GENIUS_KEY: process.env.GENIUS_ACCESS_TOKEN,
	GITHUB_KEY: process.env.GITHUB_KEY,
	GIPHY_KEY: process.env.GIPHY_KEY,
	NEWS_KEY: process.env.NEWS_KEY,
	NEW_RELIC_LOG: process.env.NEW_RELIC_LOG,
	NEW_RELIC_KEY: process.env.NEW_RELIC_LICENSE_KEY,
	WEATHER_KEY: process.env.WEATHER_KEY,
	YOUTUBE_KEY: process.env.GOOGLE_API_KEY,
	REDIS_HOST: process.env.REDIS_HOST,
	REDIS_PASS: process.env.REDIS_PASS,
	EMAIL_USER: process.env.EMAIL_USER,
	EMAIL_PASS: process.env.EMAIL_PASS,
	SUCCESS_EMOJI_ID: process.env.SUCCESS_EMOJI_ID,
};
